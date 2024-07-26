CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(191),
    customer_id INTEGER DEFAULT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT NULL,
    deleted_at TIMESTAMP DEFAULT NULL ∏
);

CREATE INDEX pets_customer_id_idx ON pets (customer_id);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(191),
    first_name VARCHAR(191) DEFAULT NULL,
    last_name VARCHAR(191) DEFAULT NULL,
    password_hash TEXT DEFAULT NULL,
    mobile_number VARCHAR(191) DEFAULT NULL,
    shopify_access_token VARCHAR(191) DEFAULT NULL,
    shopify_access_token_expires_at TIMESTAMP DEFAULT NULL,
    accepts_marketing BOOLEAN,
    shopify_cart_id TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT NULL,
    deleted_at TIMESTAMP DEFAULT NULL
);