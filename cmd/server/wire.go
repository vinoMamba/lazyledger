//go:build wireinject
// +build wireinject

package main

import (
	"github.com/gofiber/fiber/v3"
	"github.com/google/wire"
	"github.com/spf13/viper"
	"github.com/vinoMamba/lazyledger/internal/biz"
	"github.com/vinoMamba/lazyledger/internal/handler"
	"github.com/vinoMamba/lazyledger/internal/repository"
	"github.com/vinoMamba/lazyledger/internal/server"
	"github.com/vinoMamba/lazyledger/pkg/jwt"
	"github.com/vinoMamba/lazyledger/pkg/sid"
)

func NewApp(*viper.Viper) (*fiber.App, func(), error) {
	panic(wire.Build(
		handler.ProviderSet,
		repository.ProviderSet,
		biz.ProviderSet,
		server.ProviderSet,

		sid.ProviderSet,
		jwt.ProviderSet,
	))
}
