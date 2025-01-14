package biz

import (
	"errors"
	"math/big"
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
	UpdateTransactionName(ctx fiber.Ctx, userId string, params *req.UpdateTransactionNameReq) error
	UpdateTransactionAmount(ctx fiber.Ctx, userId string, params *req.UpdateTransactionAmountReq) error
	UpdateTransactionDate(ctx fiber.Ctx, userId string, params *req.UpdateTransactionDateReq) error
	UpdateTransactionCategory(ctx fiber.Ctx, userId string, params *req.UpdateTransactionCategoryReq) error
	UpdateTransactionRemark(ctx fiber.Ctx, userId string, params *req.UpdateTransactionRemarkReq) error
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

	date, err := time.Parse(time.DateOnly, params.Date)
	if err != nil {
		log.Errorf("parse transaction date error: %v", err)
		return errors.New("invalid date format")
	}

	if err := b.Queries.InsertTransaction(ctx.Context(), repository.InsertTransactionParams{
		ID:         tId,
		Name:       params.Name,
		Amount:     pgtype.Numeric{Int: big.NewInt(int64(params.Amount * 100)), Exp: -2, Valid: true},
		Date:       pgtype.Timestamp{Time: date, Valid: true},
		Remark:     pgtype.Text{String: params.Remark, Valid: true},
		CategoryID: params.CategoryId,
		CreatedBy:  pgtype.Text{String: userId, Valid: true},
		CreatedAt:  pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("insert transaction error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *transactionBiz) UpdateTransactionName(ctx fiber.Ctx, userId string, params *req.UpdateTransactionNameReq) error {

	tx, err := b.Queries.GetTransactionById(ctx.Context(), params.ID)
	if err != nil {
		log.Errorf("get transaction by id error: %v", err)
		return errors.New("internal server error")
	}

	if tx.ID == "" {
		return errors.New("transaction not found")
	}

	if err := b.Queries.UpdateTransactionName(ctx.Context(), repository.UpdateTransactionNameParams{
		ID:        tx.ID,
		Name:      params.Name,
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("update transaction error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *transactionBiz) UpdateTransactionAmount(ctx fiber.Ctx, userId string, params *req.UpdateTransactionAmountReq) error {

	tx, err := b.Queries.GetTransactionById(ctx.Context(), params.ID)
	if err != nil {
		log.Errorf("get transaction by id error: %v", err)
		return errors.New("internal server error")
	}

	if tx.ID == "" {
		return errors.New("transaction not found")
	}

	if err := b.Queries.UpdateTransactionAmount(ctx.Context(), repository.UpdateTransactionAmountParams{
		ID:        tx.ID,
		Amount:    pgtype.Numeric{Int: big.NewInt(int64(params.Amount * 100)), Exp: -2, Valid: true},
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("update transaction error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *transactionBiz) UpdateTransactionDate(ctx fiber.Ctx, userId string, params *req.UpdateTransactionDateReq) error {

	tx, err := b.Queries.GetTransactionById(ctx.Context(), params.ID)
	if err != nil {
		log.Errorf("get transaction by id error: %v", err)
		return errors.New("internal server error")
	}

	if tx.ID == "" {
		return errors.New("transaction not found")
	}

	date, err := time.Parse(time.DateOnly, params.Date)
	if err != nil {
		log.Errorf("parse transaction date error: %v", err)
		return errors.New("invalid date format")
	}

	if err := b.Queries.UpdateTransactionDate(ctx.Context(), repository.UpdateTransactionDateParams{
		ID:        tx.ID,
		Date:      pgtype.Timestamp{Time: date, Valid: true},
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("update transaction error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *transactionBiz) UpdateTransactionCategory(ctx fiber.Ctx, userId string, params *req.UpdateTransactionCategoryReq) error {

	tx, err := b.Queries.GetTransactionById(ctx.Context(), params.ID)
	if err != nil {
		log.Errorf("get transaction by id error: %v", err)
		return errors.New("internal server error")
	}

	if tx.ID == "" {
		return errors.New("transaction not found")
	}

	if err := b.Queries.UpdateTransactionCategory(ctx.Context(), repository.UpdateTransactionCategoryParams{
		ID:         tx.ID,
		CategoryID: params.CategoryId,
		UpdatedBy:  pgtype.Text{String: userId, Valid: true},
		UpdatedAt:  pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("update transaction error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *transactionBiz) UpdateTransactionRemark(ctx fiber.Ctx, userId string, params *req.UpdateTransactionRemarkReq) error {

	tx, err := b.Queries.GetTransactionById(ctx.Context(), params.ID)
	if err != nil {
		log.Errorf("get transaction by id error: %v", err)
		return errors.New("internal server error")
	}

	if tx.ID == "" {
		return errors.New("transaction not found")
	}

	if err := b.Queries.UpdateTransactionRemark(ctx.Context(), repository.UpdateTransactionRemarkParams{
		ID:        tx.ID,
		Remark:    pgtype.Text{String: params.Remark, Valid: true},
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
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

	amount, err := tx.Amount.Float64Value()
	if err != nil {
		log.Errorf("get transaction amount error: %v", err)
		return nil, errors.New("internal server error")
	}

	date := tx.Date.Time.Format(time.DateOnly)

	return &res.TransactionItem{
		ID:         tx.ID,
		Name:       tx.Name,
		Amount:     amount.Float64,
		CategoryID: tx.CategoryID.String,
		Type:       tx.Type.Int16,
		Date:       date,
		Remark:     tx.Remark.String,
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
		amount, err := tx.Amount.Float64Value()
		if err != nil {
			log.Errorf("get transaction amount error: %v", err)
			return nil, errors.New("internal server error")
		}
		date := tx.Date.Time.Format(time.DateOnly)

		txsRes = append(txsRes, &res.TransactionItem{
			ID:         tx.ID,
			Name:       tx.Name,
			Amount:     amount.Float64,
			Date:       date,
			Remark:     tx.Remark.String,
			CategoryID: tx.CategoryID.String,
			Type:       tx.Type.Int16,
		})
	}

	return txsRes, nil
}
