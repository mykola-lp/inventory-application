// controllers/indexController.js
const db = require("../db/queries");

async function indexGet(req, res) {
  const categories = await db.getAllCategories();

  res.render(
    "index", {
      title: "Horse Store",
      categories: categories
    }
  );
}

module.exports = { indexGet };