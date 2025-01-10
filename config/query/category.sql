-- name: InsertCategory :exec
INSERT INTO categories (
  id, 
  name, 
  color,
  icon,
  type,
  created_by,
  created_at
) VALUES ($1, $2, $3, $4, $5, $6, $7);

-- name: GetCategoryById :one
SELECT * FROM categories WHERE id = $1 AND is_deleted = false LIMIT 1;

-- name: UpdateCategory :exec
UPDATE categories SET 
name = $2,
color = $3,
icon = $4,
type = $5,
updated_by = $6,
updated_at = $7
WHERE id = $1;

-- name: DeleteCategory :exec
UPDATE categories SET 
is_deleted = true,
updated_by = $2,
updated_at = $3
WHERE id = $1;

-- name: GetCategoryListByCreator :many
SELECT * FROM categories WHERE created_by = $1 AND name LIKE $2 AND is_deleted = false ORDER BY created_at DESC;
