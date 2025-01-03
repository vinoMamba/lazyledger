-- migrate:up
CREATE TABLE categories (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  name VARCHAR(32) NOT NULL,
  color VARCHAR(32) NOT NULL,
  type SMALLINT NOT NULL CHECK (type IN (0, 1)),
  is_deleted BOOLEAN DEFAULT FALSE,
  created_by VARCHAR(64) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_by VARCHAR(64) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

COMMENT ON COLUMN categories.type IS '0: income, 1: expense';

-- migrate:down
DROP TABLE categories;


