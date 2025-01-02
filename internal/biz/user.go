package biz

import (
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/h2non/filetype"
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
	UploadAvatar(ctx fiber.Ctx, file *multipart.FileHeader, userId string) error
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

func (b *userBiz) UploadAvatar(ctx fiber.Ctx, file *multipart.FileHeader, userId string) error {
	f, err := file.Open()
	if err != nil {
		log.Errorf("open file error: &v", err)
		return err
	}

	defer f.Close()
	fileBytes, err := io.ReadAll(f)

	if err != nil {
		log.Errorf("read file error: &v", err)
		return err
	}

	isImage := filetype.IsImage(fileBytes)
	if !isImage {
		return errors.New("this file is not image")
	}

	fileName := fmt.Sprintf("%s_%s_%s", userId, strconv.FormatInt(time.Now().Unix(), 10), file.Filename)
	filePath := b.Config.GetString("asset.icon_file_path") + fileName

	params := repository.UpdateUserAvatarParams{
		Avatar:    pgtype.Text{Valid: true, String: fileName},
		ID:        userId,
		UpdatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
	}
	if err := b.Queries.UpdateUserAvatar(ctx.Context(), params); err != nil {
		log.Errorf("database error: &v", err)
		return errors.New("internal server error")
	}
	return ctx.SaveFile(file, filePath)
}
