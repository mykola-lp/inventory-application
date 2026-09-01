#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  age INTEGER,
  sex VARCHAR(20),
  height_hands NUMERIC(4,1),
  color VARCHAR(50),
  price NUMERIC(10,2),
  description TEXT
);

TRUNCATE TABLE items, categories RESTART IDENTITY CASCADE;

INSERT INTO categories (name, description)
VALUES
  ('Arabian', 'Known for endurance and elegance'),
  ('Draft', 'Large, strong horses bred for heavy work'),
  ('Pony', 'Small, hardy breed'),
  ('Thoroughbred', 'Fast, athletic breed used in racing'),
  ('Quarter Horse', 'Versatile breed known for sprinting speed'),
  ('Gaited', 'Breeds with smooth, natural four-beat gaits'),
  ('Miniature', 'Very small horses, kept mostly as companions');

-- Arabian (category_id 1) — 3 horses
INSERT INTO items (name, category_id, age, sex, height_hands, color, price, description)
VALUES
  ('Shadow', 1, 5, 'gelding', 15.2, 'Bay', 8500.00, 'Calm and well-trained trail horse'),
  ('Sahara', 1, 7, 'mare', 14.8, 'Grey', 9200.00, 'Elegant mare with excellent stamina'),
  ('Zephyr', 1, 4, 'stallion', 15.0, 'Chestnut', 11000.00, 'High energy, needs experienced rider');

-- Draft (category_id 2) — 5 horses
INSERT INTO items (name, category_id, age, sex, height_hands, color, price, description)
VALUES
  ('Thunder', 2, 8, 'stallion', 17.0, 'Black', 12000.00, 'Strong draft horse, great for farm work'),
  ('Atlas', 2, 6, 'gelding', 17.2, 'Bay', 9800.00, 'Gentle giant, good with beginners'),
  ('Bruno', 2, 10, 'gelding', 16.8, 'Brown', 7500.00, 'Reliable, experienced in pulling carts'),
  ('Duke', 2, 4, 'stallion', 17.5, 'Black', 13500.00, 'Young, powerful, still in training'),
  ('Titan', 2, 9, 'gelding', 18.0, 'Grey', 10500.00, 'Massive frame, calm temperament');

-- Pony (category_id 3) — 1 horse
INSERT INTO items (name, category_id, age, sex, height_hands, color, price, description)
VALUES
  ('Biscuit', 3, 3, 'mare', 11.5, 'Chestnut', 3200.00, 'Friendly pony, good for beginners');

-- Thoroughbred (category_id 4) — 0 horses (empty on purpose)

-- Quarter Horse (category_id 5) — 2 horses
INSERT INTO items (name, category_id, age, sex, height_hands, color, price, description)
VALUES
  ('Ranger', 5, 6, 'gelding', 15.1, 'Palomino', 7800.00, 'Fast and agile, great for barrel racing'),
  ('Dusty', 5, 5, 'mare', 14.9, 'Sorrel', 8100.00, 'Well-mannered, good on the trail');

-- Gaited (category_id 6) — 4 horses
INSERT INTO items (name, category_id, age, sex, height_hands, color, price, description)
VALUES
  ('Whisper', 6, 7, 'mare', 15.0, 'Black', 9500.00, 'Extremely smooth gait, comfortable ride'),
  ('Melody', 6, 4, 'mare', 14.7, 'Bay', 8700.00, 'Young and eager to please'),
  ('Breeze', 6, 9, 'gelding', 15.3, 'Chestnut', 7200.00, 'Very calm, ideal for long rides'),
  ('Harmony', 6, 6, 'mare', 15.1, 'Grey', 8900.00, 'Well-trained, competes in gaited shows');

-- Miniature (category_id 7) — 2 horses
INSERT INTO items (name, category_id, age, sex, height_hands, color, price, description)
VALUES
  ('Peanut', 7, 2, 'gelding', 8.2, 'Brown', 1800.00, 'Sweet-natured, great companion animal'),
  ('Cookie', 7, 5, 'mare', 8.5, 'White', 2100.00, 'Well-socialized, good with children');
`;

async function main() {
  console.log("seeding...");

  const connectionString = process.argv[2] || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("Provide a connection string as an argument, or set DATABASE_URL in .env");
    process.exit(1);
  }

  const client = new Client({ connectionString });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();