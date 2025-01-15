-- name: InsertTransaction :exec
INSERT INTO transactions (
  id, 
  name, 
  amount,
  type,
  date,
  remark,
  category_id,
  created_by,
  created_at
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);

-- name: GetTransactionById :one
SELECT * FROM transactions WHERE id = $1 AND is_deleted = false LIMIT 1;

-- name: UpdateTransaction :exec
UPDATE transactions SET 
name = $2,
amount = $3,
type = $4,
date = $5,
remark = $6,
category_id = $7,
updated_by = $8,
updated_at = $9
WHERE id = $1;


-- name: UpdateTransactionName :exec
UPDATE transactions SET 
name = $2,
updated_by = $3,
updated_at = $4
WHERE id = $1;

-- name: UpdateTransactionAmount :exec
UPDATE transactions SET 
amount = $2,
updated_by = $3,
updated_at = $4
WHERE id = $1;

-- name: UpdateTransactionCategory :exec
UPDATE transactions SET 
category_id = $2,
updated_by = $3,
updated_at = $4
WHERE id = $1;

-- name: UpdateTransactionRemark :exec
UPDATE transactions SET 
remark = $2,
updated_by = $3,
updated_at = $4
WHERE id = $1;

-- name: UpdateTransactionDate :exec
UPDATE transactions SET 
date = $2,
updated_by = $3,
updated_at = $4
WHERE id = $1;

-- name: UpdateTransactionType :exec
UPDATE transactions SET 
type = $2,
updated_by = $3,
updated_at = $4
WHERE id = $1;

-- name: DeleteTransaction :exec
UPDATE transactions SET 
is_deleted = true,
updated_by = $2,
updated_at = $3
WHERE id = $1;

-- name: GetTransactionListByCreator :many
SELECT * FROM transactions WHERE created_by = $1 AND is_deleted = false ORDER BY date DESC, created_at DESC;
