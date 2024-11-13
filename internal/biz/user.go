package biz

import (
	"context"

	"github.com/google/uuid"
	pb "github.com/vinoMamba/lazyledger/api/user"
	"github.com/vinoMamba/lazyledger/internal/repository"
)

type UserBiz struct {
	repo *repository.Queries
}

func NewUserBiz(repo *repository.Queries) *UserBiz {
	return &UserBiz{repo: repo}
}

func (b *UserBiz) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterReply, error) {
	user, err := b.repo.CreateUser(ctx, repository.CreateUserParams{
		ID:       uuid.New().String(),
		Username: req.Email,
		Email:    req.Email,
		Password: req.Password,
	})
	if err != nil {
		return nil, err
	}
	return &pb.RegisterReply{
		Id: user.ID,
	}, nil
}
