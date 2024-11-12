package service

import (
	"context"

	pb "github.com/vinoMamba/lazyledger/api/user"
	"github.com/vinoMamba/lazyledger/app/user/internal/biz"
)

type UserService struct {
	pb.UnimplementedUserServer
	ub *biz.UserBiz
}

func NewUserService(ub *biz.UserBiz) *UserService {
	return &UserService{ub: ub}
}

func (s *UserService) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterReply, error) {

	user, err := s.ub.Register(ctx, req)
	if err != nil {
		return nil, err
	}
	return &pb.RegisterReply{
		Id: user.Id,
	}, nil
}
