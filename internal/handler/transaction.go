package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazyledger/api/req"
	"github.com/vinoMamba/lazyledger/internal/biz"
)

type TransactionHandler interface {
	CreateTransaction(ctx fiber.Ctx) error
	UpdateTransaction(ctx fiber.Ctx) error
	DeleteTransaction(ctx fiber.Ctx) error
	GetTransaction(ctx fiber.Ctx) error
	GetTransactionList(ctx fiber.Ctx) error
}

type transactionHandler struct {
	transactionBiz biz.TransactionBiz
}

func NewTransactionHandler(transactionBiz biz.TransactionBiz) TransactionHandler {
	return &transactionHandler{transactionBiz: transactionBiz}
}

func (h *transactionHandler) CreateTransaction(ctx fiber.Ctx) error {

	userId := GetUserIdFromLocals(ctx)
	params := new(req.CreateTransactionReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.transactionBiz.CreateTransaction(ctx, userId, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *transactionHandler) UpdateTransaction(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	params := new(req.UpdateTransactionReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.transactionBiz.UpdateTransaction(ctx, userId, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *transactionHandler) DeleteTransaction(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	id := ctx.Params("id")

	if err := h.transactionBiz.DeleteTransaction(ctx, userId, id); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *transactionHandler) GetTransaction(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	id := ctx.Query("id")

	tx, err := h.transactionBiz.GetTransaction(ctx, userId, id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(tx)
}

func (h *transactionHandler) GetTransactionList(ctx fiber.Ctx) error {

	userId := GetUserIdFromLocals(ctx)

	txs, err := h.transactionBiz.GetTransactionList(ctx, userId)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(txs)
}
