package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazyledger/api/req"
	"github.com/vinoMamba/lazyledger/internal/biz"
)

type TransactionHandler interface {
	CreateTransaction(ctx fiber.Ctx) error
	UpdateTransactionName(ctx fiber.Ctx) error
	UpdateTransactionAmount(ctx fiber.Ctx) error
	UpdateTransactionDate(ctx fiber.Ctx) error
	UpdateTransactionCategory(ctx fiber.Ctx) error
	UpdateTransactionRemark(ctx fiber.Ctx) error
	DeleteTransaction(ctx fiber.Ctx) error
	GetTransaction(ctx fiber.Ctx) error
	GetTransactionList(ctx fiber.Ctx) error
	UploadTransaction(ctx fiber.Ctx) error
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

func (h *transactionHandler) UpdateTransactionName(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	params := new(req.UpdateTransactionNameReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.transactionBiz.UpdateTransactionName(ctx, userId, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}
func (h *transactionHandler) UpdateTransactionAmount(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	params := new(req.UpdateTransactionAmountReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.transactionBiz.UpdateTransactionAmount(ctx, userId, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *transactionHandler) UpdateTransactionDate(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	params := new(req.UpdateTransactionDateReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.transactionBiz.UpdateTransactionDate(ctx, userId, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}
func (h *transactionHandler) UpdateTransactionCategory(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	params := new(req.UpdateTransactionCategoryReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.transactionBiz.UpdateTransactionCategory(ctx, userId, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *transactionHandler) UpdateTransactionRemark(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	params := new(req.UpdateTransactionRemarkReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.transactionBiz.UpdateTransactionRemark(ctx, userId, params); err != nil {
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

	params := new(req.DeleteTransactionReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.transactionBiz.DeleteTransaction(ctx, userId, params); err != nil {
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

func (h *transactionHandler) UploadTransaction(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)

	file, err := ctx.FormFile("file")
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.transactionBiz.UploadTransaction(ctx, userId, file); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}
