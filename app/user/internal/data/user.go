package data

import (
	"context"

	"github.com/go-kratos/kratos/v2/log"
	"github.com/vinoMamba/lazyledger/app/user/internal/biz"
)

type userRepo struct {
	data *Data
	log  *log.Helper
}

func NewUserRepo(data *Data, logger log.Logger) biz.UserRepo {
	return &userRepo{
		data: data,
		log:  log.NewHelper(logger),
	}
}

func (r *userRepo) CreateUser(ctx context.Context, user *biz.User) error {

	_, err := r.data.sqlx.ExecContext(
		ctx,
		"INSERT INTO users (id, email, username, password ) VALUES ($1, $2, $3, $4)",
		user.Id, user.Email, user.Username, user.Password,
	)
	if err != nil {
		return err
	}

	return nil
}
