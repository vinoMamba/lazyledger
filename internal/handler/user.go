package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/vinoMamba/lazyledger/api/req"
	"github.com/vinoMamba/lazyledger/internal/biz"
)

type UserHandler interface {
	Register(ctx fiber.Ctx) error
	Login(ctx fiber.Ctx) error
	GetUserInfo(ctx fiber.Ctx) error
	UpdateUserAvatar(ctx fiber.Ctx) error
}

type userHandler struct {
	userBiz biz.UserBiz
}

func NewUserHandler(userBiz biz.UserBiz) UserHandler {
	return &userHandler{userBiz: userBiz}
}

func (h *userHandler) Register(ctx fiber.Ctx) error {
	params := new(req.RegisterReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.userBiz.Register(ctx, params); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *userHandler) Login(ctx fiber.Ctx) error {
	params := new(req.LoginWithPasswordReq)
	if err := ctx.Bind().JSON(params); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	user, err := h.userBiz.Login(ctx, params)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(user)
}

func (h *userHandler) GetUserInfo(ctx fiber.Ctx) error {
	userId := GetUserIdFromLocals(ctx)
	user, err := h.userBiz.GetUserInfo(ctx, userId)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(user)
}

func (u *userHandler) UpdateUserAvatar(c fiber.Ctx) error {
	userId := GetUserIdFromLocals(c)
	file, err := c.FormFile("file")
	if err != nil {
		log.Errorf("Read file error: %v", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := u.userBiz.UploadAvatar(c, file, userId); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "upload avatar failed",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}
