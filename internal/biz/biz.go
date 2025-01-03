package biz

import (
	"github.com/google/wire"
	"github.com/spf13/viper"
	"github.com/vinoMamba/lazyledger/internal/repository"
	"github.com/vinoMamba/lazyledger/pkg/jwt"
	"github.com/vinoMamba/lazyledger/pkg/sid"
)

var ProviderSet = wire.NewSet(
	NewBiz,
	NewUserBiz,
	NewCategoryBiz,
)

type Biz struct {
	Queries *repository.Queries
	Sid     *sid.Sid
	Jwt     *jwt.JWT
	Config  *viper.Viper
}

func NewBiz(queries *repository.Queries, sid *sid.Sid, jwt *jwt.JWT, config *viper.Viper) *Biz {
	return &Biz{Queries: queries, Sid: sid, Jwt: jwt, Config: config}
}
