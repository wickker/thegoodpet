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
  meal_doneness VARCHAR(191)
);