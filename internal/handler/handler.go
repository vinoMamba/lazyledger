package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/google/wire"
	"github.com/vinoMamba/lazyledger/internal/middleware"
	"github.com/vinoMamba/lazyledger/pkg/jwt"
)

var ProviderSet = wire.NewSet(
	NewUserHandler,
	NewCategoryHandler,
	NewTagHandler,
	NewTransactionHandler,
)

func GetUserIdFromLocals(c fiber.Ctx) string {
	user := c.Locals(middleware.UserKey)
	return user.(*jwt.CustomClaims).UserId
}
