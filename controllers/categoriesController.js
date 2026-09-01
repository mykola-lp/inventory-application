// controllers/categoriesController.js
const db = require("../db/queries");

const CustomNotFoundError = require("../errors/CustomNotFoundError");

async function categoryDetailGet(req, res) {
  const { id } = req.params;
  const category = await db.getCategoryById(id);

  if (!category) throw new CustomNotFoundError("Category not found");

  const items = await db.getItemsByCategoryId(id);

  res.render(
    "category", {
      title: category.name,
      category: category,
      items: items,
    }
  );
}

async function categoryCreateGet(req, res) {
  res.send("Category create form");
}

async function categoryCreatePost(req, res) {
  res.send("Category created");
}

async function categoryUpdateGet(req, res) {
  res.send(`Category update form: ${req.params.id}`);
}

async function categoryUpdatePost(req, res) {
  res.send(`Category updated: ${req.params.id}`);
}

async function categoryDeletePost(req, res) {
  res.send(`Category deleted: ${req.params.id}`);
}

module.exports = {
  categoryDetailGet,
  categoryCreateGet,
  categoryCreatePost,
  categoryUpdateGet,
  categoryUpdatePost,
  categoryDeletePost,
};