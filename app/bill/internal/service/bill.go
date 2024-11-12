package service

import (
	"context"

	pb "github.com/vinoMamba/lazyledger/api/bill"
)

type BillService struct {
	pb.UnimplementedBillServer
}

func NewBillService() *BillService {
	return &BillService{}
}

func (s *BillService) CreateBill(ctx context.Context, req *pb.CreateBillRequest) (*pb.CreateBillReply, error) {
	return &pb.CreateBillReply{}, nil
}
