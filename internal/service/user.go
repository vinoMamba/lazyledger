package service

import (
	"context"

	pb "github.com/vinoMamba/lazyledger/api/user"
	"github.com/vinoMamba/lazyledger/internal/biz"
)

type UserService struct {
	pb.UnimplementedUserServer
	ub *biz.UserBiz
}

func NewUserService(ub *biz.UserBiz) *UserService {
	return &UserService{ub: ub}
}

func (s *UserService) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterReply, error) {
	return s.ub.Register(ctx, req)
}
func (s *UserService) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginReply, error) {
	return &pb.LoginReply{}, nil
}
func (s *UserService) GetProfile(ctx context.Context, req *pb.GetProfileRequest) (*pb.GetProfileReply, error) {
	return &pb.GetProfileReply{}, nil
}
func (s *UserService) UpdateProfile(ctx context.Context, req *pb.UpdateProfileRequest) (*pb.UpdateProfileReply, error) {
	return &pb.UpdateProfileReply{}, nil
}
func (s *UserService) UpdatePassword(ctx context.Context, req *pb.UpdatePasswordRequest) (*pb.UpdatePasswordReply, error) {
	return &pb.UpdatePasswordReply{}, nil
}
func (s *UserService) UpdateEmail(ctx context.Context, req *pb.UpdateEmailRequest) (*pb.UpdateEmailReply, error) {
	return &pb.UpdateEmailReply{}, nil
}
