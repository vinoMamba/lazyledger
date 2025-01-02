package biz

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/vinoMamba/lazyledger/api/req"
	"github.com/vinoMamba/lazyledger/api/res"
	"github.com/vinoMamba/lazyledger/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

type UserBiz interface {
	Register(ctx fiber.Ctx, params *req.RegisterReq) error
	Login(ctx fiber.Ctx, params *req.LoginWithPasswordReq) (*res.LoginWithPasswordRes, error)
	GetUserInfo(ctx fiber.Ctx, userId string) (*res.GetUserInfoRes, error)
}

type userBiz struct {
	*Biz
}

func NewUserBiz(biz *Biz) UserBiz {
	return &userBiz{Biz: biz}
}

func (b *userBiz) Register(ctx fiber.Ctx, params *req.RegisterReq) error {

	user, err := b.Queries.GetUserByEmail(ctx.Context(), params.Email)
	if err == nil || user.ID != "" {
		log.Errorf("user already exists: %v", err)
		return errors.New("user already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(params.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Errorf("generate password error: %v", err)
		return errors.New("internal server error")
	}

	uId, err := b.Sid.GenString()
	if err != nil {
		log.Errorf("generate user id error: %v", err)
		return errors.New("internal server error")
	}
	if err := b.Queries.InsertUser(ctx.Context(), repository.InsertUserParams{
		ID:        uId,
		Username:  params.Email,
		Email:     params.Email,
		Password:  string(hashedPassword),
		CreatedBy: pgtype.Text{String: uId, Valid: true},
		CreatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("insert user error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *userBiz) Login(ctx fiber.Ctx, params *req.LoginWithPasswordReq) (*res.LoginWithPasswordRes, error) {

	user, err := b.Queries.GetUserByEmail(ctx.Context(), params.Email)
	if err != nil {
		log.Errorf("get user by email error: %v", err)
		return nil, errors.New("user not found")
	}

	if user.ID == "" {
		return nil, errors.New("user not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(params.Password)); err != nil {
		return nil, errors.New("password is incorrect")
	}
	token, err := b.Jwt.GenJWT(user.ID, user.Email)
	if err != nil {
		log.Errorf("generate jwt error: %v", err)
		return nil, errors.New("internal server error")
	}

	return &res.LoginWithPasswordRes{
		Token: token,
	}, nil
}

func (b *userBiz) GetUserInfo(ctx fiber.Ctx, userId string) (*res.GetUserInfoRes, error) {
	user, err := b.Queries.GetUserById(ctx.Context(), userId)
	if err != nil {
		log.Errorf("get user by id error: %v", err)
		return nil, errors.New("user not found")
	}

	return &res.GetUserInfoRes{
		UserId:    user.ID,
		Username:  user.Username,
		Email:     user.Email,
		Avatar:    user.Avatar.String,
		CreatedAt: user.CreatedAt.Time.Format(time.DateTime),
	}, nil

}
