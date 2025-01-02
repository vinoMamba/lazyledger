-- migrate:up
CREATE TABLE users (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  username VARCHAR(32) NOT NULL,
  email VARCHAR(64) NOT NULL,
  avatar VARCHAR(255) DEFAULT NULL,
  password VARCHAR(200) NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_by VARCHAR(64) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_by VARCHAR(64) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- migrate:down
DROP TABLE users;


