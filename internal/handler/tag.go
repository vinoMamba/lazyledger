package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazyledger/api/req"
	"github.com/vinoMamba/lazyledger/internal/biz"
)

type TagHandler interface {
	CreateTag(ctx fiber.Ctx) error
	UpdateTag(ctx fiber.Ctx) error
	DeleteTag(ctx fiber.Ctx) error
	GetTagListByCreator(ctx fiber.Ctx) error
}

type tagHandler struct {
	tagBiz biz.TagBiz
}

func NewTagHandler(tagBiz biz.TagBiz) TagHandler {
	return &tagHandler{tagBiz: tagBiz}
}

func (h *tagHandler) CreateTag(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	params := new(req.CreateTagReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.tagBiz.CreateTag(ctx, userId, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *tagHandler) UpdateTag(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	params := new(req.UpdateTagReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.tagBiz.UpdateTag(ctx, userId, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *tagHandler) DeleteTag(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	tagId := ctx.Params("tagId")

	if err := h.tagBiz.DeleteTag(ctx, userId, tagId); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *tagHandler) GetTagListByCreator(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)

	items, err := h.tagBiz.GetTagListByCreator(ctx, userId)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(items)
}
