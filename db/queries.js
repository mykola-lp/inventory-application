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

module.exports = {
  getAllCategories,
  getCategoryById,
  getItemsByCategoryId,
  getItemById,
};