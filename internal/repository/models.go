// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package repository

import (
	"github.com/jackc/pgx/v5/pgtype"
)

type Category struct {
	ID    string
	Name  string
	Color string
	Icon  string
	// 0: income, 1: expense
	Type      int16
	IsDeleted pgtype.Bool
	CreatedBy pgtype.Text
	CreatedAt pgtype.Timestamp
	UpdatedBy pgtype.Text
	UpdatedAt pgtype.Timestamp
}

type User struct {
	ID        string
	Username  string
	Email     string
	Avatar    pgtype.Text
	Password  string
	IsDeleted pgtype.Bool
	CreatedBy pgtype.Text
	CreatedAt pgtype.Timestamp
	UpdatedBy pgtype.Text
	UpdatedAt pgtype.Timestamp
}
