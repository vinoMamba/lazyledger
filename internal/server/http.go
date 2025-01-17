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
	categoryHandler handler.CategoryHandler,
	tagHandler handler.TagHandler,
	transactionHandler handler.TransactionHandler,
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
	user.Put("/email", userHandler.UpdateUserEmail)
	user.Put("/password", userHandler.UpdateUserPassword)
	user.Put("/avatar", userHandler.UpdateUserAvatar)
	user.Put("/username", userHandler.UpdateUsername)

	category := app.Group("/category")
	category.Use(middleware.JWTMiddleware(jwt, userBiz))
	category.Post("", categoryHandler.CreateCategory)
	category.Put("", categoryHandler.UpdateCategory)
	category.Delete("/:categoryId", categoryHandler.DeleteCategory)
	category.Get("/list", categoryHandler.GetCategoryListByCreator)

	tag := app.Group("/tag")
	tag.Use(middleware.JWTMiddleware(jwt, userBiz))
	tag.Post("", tagHandler.CreateTag)
	tag.Put("/:tagId", tagHandler.UpdateTag)
	tag.Delete("/:tagId", tagHandler.DeleteTag)
	tag.Get("/list", tagHandler.GetTagListByCreator)

	transaction := app.Group("/transaction")
	transaction.Use(middleware.JWTMiddleware(jwt, userBiz))
	transaction.Post("", transactionHandler.CreateTransaction)
	transaction.Put("/name", transactionHandler.UpdateTransactionName)
	transaction.Put("/amount", transactionHandler.UpdateTransactionAmount)
	transaction.Put("/date", transactionHandler.UpdateTransactionDate)
	transaction.Put("/category", transactionHandler.UpdateTransactionCategory)
	transaction.Put("/remark", transactionHandler.UpdateTransactionRemark)
	transaction.Delete("", transactionHandler.DeleteTransaction)
	transaction.Get("/list", transactionHandler.GetTransactionList)
	transaction.Get("/info", transactionHandler.GetTransaction)
	transaction.Post("/upload", transactionHandler.UploadTransaction)
	app.Use(middleware.NotFound())
	return app
}
