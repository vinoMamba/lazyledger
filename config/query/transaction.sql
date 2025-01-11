-- name: InsertTransaction :exec
INSERT INTO transactions (
  id, 
  name, 
  amount,
  date,
  category_id,
  created_by,
  created_at
) VALUES ($1, $2, $3, $4, $5, $6, $7);

-- name: GetTransactionById :one
SELECT * FROM transactions WHERE id = $1 AND is_deleted = false LIMIT 1;

-- name: UpdateTransaction :exec
UPDATE transactions SET 
name = $2,
amount = $3,
date = $4,
category_id = $5,
updated_by = $6,
updated_at = $7
WHERE id = $1;

-- name: DeleteTransaction :exec
UPDATE transactions SET 
is_deleted = true,
updated_by = $2,
updated_at = $3
WHERE id = $1;

-- name: GetTransactionListByCreator :many
SELECT * FROM transactions WHERE created_by = $1 AND is_deleted = false ORDER BY date DESC;
