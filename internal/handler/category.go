package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazyledger/api/req"
	"github.com/vinoMamba/lazyledger/internal/biz"
)

type CategoryHandler interface {
	CreateCategory(ctx fiber.Ctx) error
	UpdateCategory(ctx fiber.Ctx) error
	DeleteCategory(ctx fiber.Ctx) error
	GetCategoryListByCreator(ctx fiber.Ctx) error
}

type categoryHandler struct {
	categoryBiz biz.CategoryBiz
}

func NewCategoryHandler(categoryBiz biz.CategoryBiz) CategoryHandler {
	return &categoryHandler{categoryBiz: categoryBiz}
}

func (h *categoryHandler) CreateCategory(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	params := new(req.CreateCategoryReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.categoryBiz.CreateCategory(ctx, userId, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *categoryHandler) UpdateCategory(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	params := new(req.UpdateCategoryReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.categoryBiz.UpdateCategory(ctx, userId, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *categoryHandler) DeleteCategory(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	categoryId := ctx.Params("categoryId")

	if err := h.categoryBiz.DeleteCategory(ctx, userId, categoryId); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *categoryHandler) GetCategoryListByCreator(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)

	items, err := h.categoryBiz.GetCategoryListByCreator(ctx, userId)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(items)
}
