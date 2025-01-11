// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: transaction.sql

package repository

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const deleteTransaction = `-- name: DeleteTransaction :exec
UPDATE transactions SET 
is_deleted = true,
updated_by = $2,
updated_at = $3
WHERE id = $1
`

type DeleteTransactionParams struct {
	ID        string
	UpdatedBy pgtype.Text
	UpdatedAt pgtype.Timestamp
}

func (q *Queries) DeleteTransaction(ctx context.Context, arg DeleteTransactionParams) error {
	_, err := q.db.Exec(ctx, deleteTransaction, arg.ID, arg.UpdatedBy, arg.UpdatedAt)
	return err
}

const getTransactionById = `-- name: GetTransactionById :one
SELECT id, name, amount, category_id, is_deleted, created_by, created_at, updated_by, updated_at FROM transactions WHERE id = $1 AND is_deleted = false LIMIT 1
`

func (q *Queries) GetTransactionById(ctx context.Context, id string) (Transaction, error) {
	row := q.db.QueryRow(ctx, getTransactionById, id)
	var i Transaction
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Amount,
		&i.CategoryID,
		&i.IsDeleted,
		&i.CreatedBy,
		&i.CreatedAt,
		&i.UpdatedBy,
		&i.UpdatedAt,
	)
	return i, err
}

const getTransactionListByCreator = `-- name: GetTransactionListByCreator :many
SELECT id, name, amount, category_id, is_deleted, created_by, created_at, updated_by, updated_at FROM transactions WHERE created_by = $1 AND is_deleted = false ORDER BY created_at DESC
`

func (q *Queries) GetTransactionListByCreator(ctx context.Context, createdBy pgtype.Text) ([]Transaction, error) {
	rows, err := q.db.Query(ctx, getTransactionListByCreator, createdBy)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Transaction
	for rows.Next() {
		var i Transaction
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Amount,
			&i.CategoryID,
			&i.IsDeleted,
			&i.CreatedBy,
			&i.CreatedAt,
			&i.UpdatedBy,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const insertTransaction = `-- name: InsertTransaction :exec
INSERT INTO transactions (
  id, 
  name, 
  amount,
  category_id,
  created_by,
  created_at
) VALUES ($1, $2, $3, $4, $5, $6)
`

type InsertTransactionParams struct {
	ID         string
	Name       string
	Amount     int32
	CategoryID string
	CreatedBy  pgtype.Text
	CreatedAt  pgtype.Timestamp
}

func (q *Queries) InsertTransaction(ctx context.Context, arg InsertTransactionParams) error {
	_, err := q.db.Exec(ctx, insertTransaction,
		arg.ID,
		arg.Name,
		arg.Amount,
		arg.CategoryID,
		arg.CreatedBy,
		arg.CreatedAt,
	)
	return err
}

const updateTransaction = `-- name: UpdateTransaction :exec
UPDATE transactions SET 
name = $2,
amount = $3,
category_id = $4,
updated_by = $5,
updated_at = $6
WHERE id = $1
`

type UpdateTransactionParams struct {
	ID         string
	Name       string
	Amount     int32
	CategoryID string
	UpdatedBy  pgtype.Text
	UpdatedAt  pgtype.Timestamp
}

func (q *Queries) UpdateTransaction(ctx context.Context, arg UpdateTransactionParams) error {
	_, err := q.db.Exec(ctx, updateTransaction,
		arg.ID,
		arg.Name,
		arg.Amount,
		arg.CategoryID,
		arg.UpdatedBy,
		arg.UpdatedAt,
	)
	return err
}
