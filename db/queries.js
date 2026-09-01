// db/queries.js
const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query(
    "SELECT * FROM categories ORDER BY name"
  );

  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE id = $1",
    [id]
  );

  return rows[0];
}

async function getItemsByCategoryId(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1 ORDER BY name",
    [categoryId]
  );

  return rows;
}

async function getItemById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE id = $1",
    [id]
  );

  return rows[0];
}

async function createCategory({ name, description }) {
  const { rows } = await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );

  return rows[0];
}

async function updateCategory(id, { name, description }) {
  const { rows } = await pool.query(
    "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, id]
  );

  return rows[0];
}

async function createItem({ name, category_id, age, sex, height_hands, color, price, description }) {
  const query = `
    INSERT INTO items (
      name, category_id, age, sex, height_hands, color, price, description
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const values = [
    name,
    category_id,
    age,
    sex,
    height_hands,
    color,
    price,
    description,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function updateItem(id, { name, category_id, age, sex, height_hands, color, price, description }) {
  const query = `
    UPDATE items
    SET name = $1,
        category_id = $2,
        age = $3,
        sex = $4,
        height_hands = $5,
        color = $6,
        price = $7,
        description = $8
    WHERE id = $9
    RETURNING *
  `;

  const values = [
    name,
    category_id,
    age,
    sex,
    height_hands,
    color,
    price,
    description,
    id
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getItemsByCategoryId,
  getItemById,
  createCategory,
  updateCategory,
  createItem,
  updateItem,
};