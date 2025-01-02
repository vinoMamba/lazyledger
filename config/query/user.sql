-- name: InsertUser :exec
INSERT INTO users (
  id, 
  username, 
  email, 
  password,
  created_by,
  created_at
) VALUES ($1, $2, $3, $4, $5,$6);

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1 AND is_deleted = false LIMIT 1;
-- name: GetUserById :one
SELECT * FROM users WHERE id = $1 AND is_deleted = false LIMIT 1;
-- name: GetUserInfo :one
SELECT * FROM users WHERE id = $1 AND is_deleted = false LIMIT 1;

-- name: UpdateUserAvatar :exec
UPDATE users SET 
avatar = $2,
updated_by = $3,
updated_at = $4
WHERE id = $1;

-- name: UpdateUserPassword :exec
UPDATE users SET 
password = $2,
updated_by = $3,
updated_at = $4
WHERE id = $1;

-- name: UpdateUserEmail :exec
UPDATE users SET 
email = $2,
updated_by = $3,
updated_at = $4
WHERE id = $1;

-- name: UpdateUserUsername :exec
UPDATE users SET 
username = $2,
updated_by = $3,
updated_at = $4
WHERE id = $1;
