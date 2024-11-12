package biz

import (
	"context"

	"github.com/go-kratos/kratos/v2/log"
	"github.com/google/uuid"
	pb "github.com/vinoMamba/lazyledger/api/user"
)

type User struct {
	Id       string
	Email    string
	Username string
	Password string
	Avatar   string
}

type UserRepo interface {
	CreateUser(ctx context.Context, user *User) error
}

type UserBiz struct {
	repo UserRepo
	log  *log.Helper
}

func NewUserBiz(repo UserRepo, logger log.Logger) *UserBiz {
	return &UserBiz{
		repo: repo,
		log:  log.NewHelper(logger),
	}
}

func (b *UserBiz) Register(ctx context.Context, req *pb.RegisterRequest) (*User, error) {

	user := &User{
		Id:       uuid.New().String(),
		Email:    req.Email,
		Username: req.Email,
		Password: req.Password,
	}

	if err := b.repo.CreateUser(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}
