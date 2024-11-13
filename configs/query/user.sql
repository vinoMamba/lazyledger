-- name: CreateUser :one
INSERT INTO users (id, username, email, password, created_by, created_at)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;
