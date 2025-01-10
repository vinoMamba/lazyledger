-- name: InsertTag :exec
INSERT INTO tags (
  id, 
  name, 
  color,
  created_by,
  created_at
) VALUES ($1, $2, $3, $4, $5);

-- name: GetTagById :one
SELECT * FROM tags WHERE id = $1 AND is_deleted = false LIMIT 1;

-- name: GetTagByName :one
SELECT * FROM tags WHERE name = $1 AND is_deleted = false LIMIT 1;

-- name: UpdateTag :exec
UPDATE tags SET 
name = $2,
color = $3,
updated_by = $4,
updated_at = $5
WHERE id = $1;

-- name: DeleteTag :exec
UPDATE tags SET 
is_deleted = true,
updated_by = $2,
updated_at = $3
WHERE id = $1;

-- name: GetTagListByCreator :many
SELECT * FROM tags WHERE created_by = $1 AND is_deleted = false ORDER BY created_at DESC;
