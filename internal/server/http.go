package server

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/static"
	"github.com/google/wire"
	"github.com/vinoMamba/lazyledger/internal/biz"
	"github.com/vinoMamba/lazyledger/internal/handler"
	"github.com/vinoMamba/lazyledger/internal/middleware"
	"github.com/vinoMamba/lazyledger/pkg/jwt"
)

type structValidator struct {
	validate *validator.Validate
}

func (v *structValidator) Validate(out any) error {
	return v.validate.Struct(out)
}

func (v *structValidator) ValidateStruct(out any) error {
	return v.validate.Struct(out)
}

func (v *structValidator) Engine() any {
	return nil
}

var ProviderSet = wire.NewSet(NewHttpServer)

func NewHttpServer(
	userHandler handler.UserHandler,
	userBiz biz.UserBiz,
	jwt *jwt.JWT,
) *fiber.App {
	app := fiber.New(fiber.Config{
		StructValidator: &structValidator{validate: validator.New()},
	})

	//upload file
	app.Get("/upload/icon/*", static.New("./storage/icons"))

	app.Post("/register", userHandler.Register)
	app.Post("/login/password", userHandler.Login)

	user := app.Group("/user")
	user.Use(middleware.JWTMiddleware(jwt, userBiz))
	user.Get("/info", userHandler.GetUserInfo)
	// user.Put("/email", userHandler.UpdateUserEmail)
	// user.Put("/password", userHandler.UpdateUserPassword)
	user.Put("/avatar", userHandler.UpdateUserAvatar)

	app.Use(middleware.NotFound())
	return app
}
