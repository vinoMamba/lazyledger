package data

import (
	"github.com/go-kratos/kratos/v2/log"
	"github.com/google/wire"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/vinoMamba/lazyledger/app/user/internal/conf"
)

// ProviderSet is data providers.
var ProviderSet = wire.NewSet(NewData, NewUserRepo)

// Data .
type Data struct {
	// TODO wrapped database client
	sqlx *sqlx.DB
}

// NewData .
func NewData(c *conf.Data, logger log.Logger) (*Data, func(), error) {
	// sqlx 连接数据库
	sqlx, err := sqlx.Connect("postgres", c.Database.Source)
	if err != nil {
		return nil, nil, err
	}
	cleanup := func() {
		log.NewHelper(logger).Info("closing the data resources")
	}
	return &Data{sqlx: sqlx}, cleanup, nil
}
