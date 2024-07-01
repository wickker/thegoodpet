CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    species VARCHAR(191) DEFAULT NULL,
    name VARCHAR(191),
    dob DATE,
    gender VARCHAR(15),
    is_neutered BOOLEAN,
    breed VARCHAR(191) DEFAULT NULL,
    food_goal TEXT,
    weight_gram INTEGER,
    weight_goal VARCHAR(191),
    activity_level INTEGER,
    allergic_ingredients JSONB DEFAULT NULL,
    omit_ingredients JSONB DEFAULT NULL,
    meal_doneness VARCHAR(191),
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
    password VARCHAR(191) DEFAULT NULL,
    mobile_number VARCHAR(191) DEFAULT NULL,
    shopify_access_token VARCHAR(191) DEFAULT NULL,
    shopify_access_token_expires_at TIMESTAMP DEFAULT NULL,
    accepts_marketing BOOLEAN,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT NULL,
    deleted_at TIMESTAMP DEFAULT NULL
);