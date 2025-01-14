-- migrate:up
CREATE TABLE transactions (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  name VARCHAR(32) NOT NULL,
  date TIMESTAMP NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category_id VARCHAR(64) NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_by VARCHAR(64) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_by VARCHAR(64) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- migrate:down
DROP TABLE transactions;
