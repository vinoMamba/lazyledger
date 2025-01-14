-- name: InsertTransaction :exec
INSERT INTO transactions (
  id, 
  name, 
  amount,
  date,
  remark,
  category_id,
  created_by,
  created_at
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);

-- name: GetTransactionById :one
SELECT t.id, t.name, t.amount, t.date, t.remark, c.id AS category_id, c.type 
FROM transactions t 
LEFT JOIN categories c ON t.category_id = c.id
WHERE t.id = $1 AND t.is_deleted = false LIMIT 1;

-- name: UpdateTransaction :exec
UPDATE transactions SET 
name = $2,
amount = $3,
date = $4,
remark = $5,
category_id = $6,
updated_by = $7,
updated_at = $8
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


-- name: DeleteTransaction :exec
UPDATE transactions SET 
is_deleted = true,
updated_by = $2,
updated_at = $3
WHERE id = $1;

-- name: GetTransactionListByCreator :many
SELECT t.id, t.name, t.amount, t.date, t.remark, c.id AS category_id, c.type 
FROM transactions t 
LEFT JOIN categories c ON t.category_id = c.id
WHERE t.created_by = $1 AND t.is_deleted = false ORDER BY t.date DESC, t.created_at DESC;
