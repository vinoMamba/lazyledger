-- migrate:up
CREATE TABLE transactions (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  name VARCHAR(32) NOT NULL,
  type SMALLINT DEFAULT 0 CHECK (type IN (0, 1)),
  date TIMESTAMP NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  remark VARCHAR(255) DEFAULT NULL,
  category_id VARCHAR(64) NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_by VARCHAR(64) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_by VARCHAR(64) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

COMMENT ON COLUMN transactions.type IS '0: income, 1: expense';

-- migrate:down
DROP TABLE transactions;
