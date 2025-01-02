package middleware

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/vinoMamba/lazyledger/internal/biz"
	"github.com/vinoMamba/lazyledger/pkg/jwt"
)

type contextKey string

const UserKey contextKey = "user"

func JWTMiddleware(jwt *jwt.JWT, userBiz biz.UserBiz) fiber.Handler {
	return func(c fiber.Ctx) error {
		token := c.Get("Authorization")
		if len(token) > 0 {
			claims, err := jwt.ParseToken(token)
			if err != nil {
				log.Errorf("Token error:%v", err)
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"message": "unauthorized",
				})
			}
			c.Locals(UserKey, claims)
			_, err = userBiz.GetUserInfo(c, claims.UserId)
			if err != nil {
				log.Errorf("get user error:%v", err)
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"message": "unauthorized",
				})
			}
			return c.Next()
		} else {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "unauthorized",
			})
		}
	}
}
