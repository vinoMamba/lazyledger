package biz

import (
	"encoding/csv"
	"errors"
	"fmt"
	"io"
	"math/big"
	"mime/multipart"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/vinoMamba/lazyledger/api/req"
	"github.com/vinoMamba/lazyledger/api/res"
	"github.com/vinoMamba/lazyledger/internal/repository"
	"golang.org/x/exp/rand"
	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
)

type TransactionBiz interface {
	CreateTransaction(ctx fiber.Ctx, userId string, params *req.CreateTransactionReq) error
	UpdateTransactionName(ctx fiber.Ctx, userId string, params *req.UpdateTransactionNameReq) error
	UpdateTransactionType(ctx fiber.Ctx, userId string, params *req.UpdateTransactionTypeReq) error
	UpdateTransactionAmount(ctx fiber.Ctx, userId string, params *req.UpdateTransactionAmountReq) error
	UpdateTransactionDate(ctx fiber.Ctx, userId string, params *req.UpdateTransactionDateReq) error
	UpdateTransactionCategory(ctx fiber.Ctx, userId string, params *req.UpdateTransactionCategoryReq) error
	UpdateTransactionRemark(ctx fiber.Ctx, userId string, params *req.UpdateTransactionRemarkReq) error
	DeleteTransaction(ctx fiber.Ctx, userId string, req *req.DeleteTransactionReq) error
	GetTransaction(ctx fiber.Ctx, userId string, id string) (*res.TransactionItem, error)
	GetTransactionList(ctx fiber.Ctx, userId string) ([]*res.TransactionItem, error)
	UploadTransaction(ctx fiber.Ctx, userId string, file *multipart.FileHeader) error
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
		Type:       pgtype.Int2{Int16: int16(params.Type), Valid: true},
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

func (b *transactionBiz) UpdateTransactionType(ctx fiber.Ctx, userId string, params *req.UpdateTransactionTypeReq) error {

	tx, err := b.Queries.GetTransactionById(ctx.Context(), params.ID)
	if err != nil {
		log.Errorf("get transaction by id error: %v", err)
		return errors.New("internal server error")
	}

	if tx.ID == "" {
		return errors.New("transaction not found")
	}

	if err := b.Queries.UpdateTransactionType(ctx.Context(), repository.UpdateTransactionTypeParams{
		ID:        tx.ID,
		Type:      pgtype.Int2{Int16: int16(params.Type), Valid: true},
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("update transaction type error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *transactionBiz) DeleteTransaction(ctx fiber.Ctx, userId string, req *req.DeleteTransactionReq) error {

	ids := strings.Join(req.IDs, ",")

	if err := b.Queries.DeleteTransaction(ctx.Context(), repository.DeleteTransactionParams{
		ID:        ids,
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
		CategoryID: tx.CategoryID,
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
			CategoryID: tx.CategoryID,
			Type:       tx.Type.Int16,
		})
	}

	return txsRes, nil
}

// NOTE: 目前只适配了支付宝账单
func (b *transactionBiz) UploadTransaction(ctx fiber.Ctx, userId string, file *multipart.FileHeader) error {

	fileReader, err := file.Open()
	if err != nil {
		log.Errorf("open file error: %v", err)
		return errors.New("internal server error")
	}
	defer fileReader.Close()

	decoder := simplifiedchinese.GBK.NewDecoder()
	utf8Reader := transform.NewReader(fileReader, decoder)
	csvReader := csv.NewReader(utf8Reader)

	csvReader.LazyQuotes = true
	csvReader.TrimLeadingSpace = true
	csvReader.FieldsPerRecord = -1
	csvReader.Comma = ','

	for i := 0; i < 25; i++ {
		if _, err := csvReader.Read(); err != nil {
			log.Errorf("read csv error: %v", err)
			return errors.New("file format error")
		}
	}

	var records [][]string

	for {
		record, err := csvReader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Errorf("read csv error: %v", err)
			return errors.New("internal server error")
		}
		records = append(records, record)
	}

	for _, record := range records {
		// 不计收支或金额为0 跳过
		if record[5] == "不计收支" || record[6] == "0" || record[6] == "" || record[6] == "0.00" {
			continue
		}

		// 解析日期 2024-01-01 12:00:00
		date, err := time.Parse(time.DateTime, record[0])
		if err != nil {
			log.Errorf("parse transaction date error: %v", err)
			return errors.New("invalid date format")
		}

		// 解析金额, 保留两位小数
		amount, err := strconv.ParseFloat(record[6], 64)
		if err != nil {
			log.Errorf("parse transaction amount error: %v", err)
			return errors.New("invalid amount format")
		}

		// 解析类型
		var transactionType int
		if record[5] == "支出" {
			transactionType = 0
		} else if record[5] == "收入" {
			transactionType = 1
		}

		// 解析备注
		remark := record[4]

		// 解析分类
		var categoryId string
		category, err := b.Queries.GetCategoryByName(ctx.Context(), record[1])
		if err != nil || category.ID == "" {
			categoryId, err = b.Sid.GenString()
			if err != nil {
				log.Errorf("generate category id error: %v", err)
				return errors.New("internal server error")
			}
			b.Queries.InsertCategory(ctx.Context(), repository.InsertCategoryParams{
				ID:        categoryId,
				Name:      record[1],
				Color:     RandomColor(),
				Icon:      RandomEmojiByName(record[1]),
				CreatedBy: pgtype.Text{String: userId, Valid: true},
				CreatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
			})
		} else {
			categoryId = category.ID
		}

		tId, err := b.Sid.GenString()
		if err != nil {
			log.Errorf("generate transaction id error: %v", err)
			return errors.New("internal server error")
		}

		if err := b.Queries.InsertTransaction(ctx.Context(), repository.InsertTransactionParams{
			ID:         tId,
			Name:       record[2],
			Type:       pgtype.Int2{Int16: int16(transactionType), Valid: true},
			Amount:     pgtype.Numeric{Int: big.NewInt(int64(amount * 100)), Exp: -2, Valid: true},
			Date:       pgtype.Timestamp{Time: date, Valid: true},
			Remark:     pgtype.Text{String: remark, Valid: true},
			CategoryID: categoryId,
			CreatedBy:  pgtype.Text{String: userId, Valid: true},
			CreatedAt:  pgtype.Timestamp{Time: time.Now(), Valid: true},
		}); err != nil {
			log.Errorf("insert transaction error: %v", err)
			return errors.New("internal server error")
		}
	}

	return nil
}

func RandomColor() string {
	return fmt.Sprintf("#%06X", rand.Intn(0xFFFFFF))
}

func RandomEmojiByName(name string) string {
	categoryEmojis := map[string]string{
		"出行": "🚗",
		"红包": "🧧",
		"餐饮": "🍜",
		"健康": "💪",
		"购物": "🛒",
		"娱乐": "🎉",
		"数码": "📱",
		"服饰": "🧥",
		"缴费": "💰",
		"其他": "🤔",
	}

	// 备选emoji数组
	fallbackEmojis := []string{
		"🎨", "🎮", "🎲", "🎯", "🎳", "🎵", "🎹", "🎬", "🎃",
	}

	for category, emoji := range categoryEmojis {
		if strings.Contains(name, category) {
			return emoji
		}
	}

	return fallbackEmojis[rand.Intn(len(fallbackEmojis))]
}
