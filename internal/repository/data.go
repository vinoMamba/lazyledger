package repository

import (
	"context"
	"time"

	"github.com/go-kratos/kratos/v2/log"
	"github.com/google/wire"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/vinoMamba/lazyledger/internal/conf"
)

var ProviderSet = wire.NewSet(NewData)

func NewData(c *conf.Data, logger log.Logger) (*Queries, func(), error) {
	ctx := context.Background()
	config, err := pgxpool.ParseConfig(c.Database.Source)
	if err != nil {
		panic(err)
	}

	config.MaxConnLifetime = time.Hour
	config.MaxConns = 15

	conn, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		panic(err)
	}

	logger.Log(log.LevelInfo, "database connected")
	queries := New(conn)

	cleanup := func() {
		logger.Log(log.LevelInfo, "closing the data resources")
	}
	return queries, cleanup, nil
}
