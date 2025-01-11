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
)

type TransactionBiz interface {
	CreateTransaction(ctx fiber.Ctx, userId string, params *req.CreateTransactionReq) error
	UpdateTransaction(ctx fiber.Ctx, userId string, params *req.UpdateTransactionReq) error
	DeleteTransaction(ctx fiber.Ctx, userId string, id string) error
	GetTransaction(ctx fiber.Ctx, userId string, id string) (*res.TransactionItem, error)
	GetTransactionList(ctx fiber.Ctx, userId string) ([]*res.TransactionItem, error)
}

type transactionBiz struct {
	*Biz
}

func NewTransactionBiz(biz *Biz) TransactionBiz {
	return &transactionBiz{Biz: biz}
}

func (b *transactionBiz) CreateTransaction(ctx fiber.Ctx, userId string, params *req.CreateTransactionReq) error {

	tId, err := b.Sid.GenString()
	if err != nil {
		log.Errorf("generate transaction id error: %v", err)
		return errors.New("internal server error")
	}

	if err := b.Queries.InsertTransaction(ctx.Context(), repository.InsertTransactionParams{
		ID:         tId,
		Name:       params.Name,
		Amount:     int32(params.Amount),
		CategoryID: params.CategoryId,
		CreatedBy:  pgtype.Text{String: userId, Valid: true},
		CreatedAt:  pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("insert transaction error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *transactionBiz) UpdateTransaction(ctx fiber.Ctx, userId string, params *req.UpdateTransactionReq) error {

	tx, err := b.Queries.GetTransactionById(ctx.Context(), params.ID)
	if err != nil {
		log.Errorf("get transaction by id error: %v", err)
		return errors.New("internal server error")
	}

	if tx.ID == "" {
		return errors.New("transaction not found")
	}

	if err := b.Queries.UpdateTransaction(ctx.Context(), repository.UpdateTransactionParams{
		ID:         tx.ID,
		Name:       params.Name,
		Amount:     int32(params.Amount),
		CategoryID: params.CategoryId,
		UpdatedBy:  pgtype.Text{String: userId, Valid: true},
		UpdatedAt:  pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("update transaction error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *transactionBiz) DeleteTransaction(ctx fiber.Ctx, userId string, id string) error {
	if err := b.Queries.DeleteTransaction(ctx.Context(), repository.DeleteTransactionParams{
		ID:        id,
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("delete transaction error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *transactionBiz) GetTransaction(ctx fiber.Ctx, userId string, id string) (*res.TransactionItem, error) {

	tx, err := b.Queries.GetTransactionById(ctx.Context(), id)
	if err != nil {
		log.Errorf("get transaction by id error: %v", err)
		return nil, errors.New("internal server error")
	}

	if tx.ID == "" {
		return nil, errors.New("transaction not found")
	}

	return &res.TransactionItem{
		ID:         tx.ID,
		Name:       tx.Name,
		Amount:     int(tx.Amount),
		CategoryID: tx.CategoryID,
	}, nil
}

func (b *transactionBiz) GetTransactionList(ctx fiber.Ctx, userId string) ([]*res.TransactionItem, error) {
	txs, err := b.Queries.GetTransactionListByCreator(ctx.Context(), pgtype.Text{String: userId, Valid: true})
	if err != nil {
		log.Errorf("get transaction list by creator error: %v", err)
		return nil, errors.New("internal server error")
	}

	var txsRes []*res.TransactionItem
	for _, tx := range txs {
		txsRes = append(txsRes, &res.TransactionItem{
			ID:         tx.ID,
			Name:       tx.Name,
			Amount:     int(tx.Amount),
			CategoryID: tx.CategoryID,
		})
	}

	return txsRes, nil
}
