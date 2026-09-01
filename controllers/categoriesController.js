// controllers/categoriesController.js
const { body, validationResult } = require("express-validator");

const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

// --- DETAILS ---

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

// --- CREATE ---

async function categoryCreateGet(req, res) {
  res.render(
    "category-form", {
      title: "New Category",
      category: {},
      errors: [],
    }
  );
}

const categoryCreatePost = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 255 }),

  body("description")
    .trim()
    .optional({ values: "falsy" }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const data = {
        title: "New Category",
        category: req.body,
        errors: errors.array(),
      };

      return res.status(400).render("category-form", data);
    }

    const newCategory = await db.createCategory(req.body);

    res.redirect(`/categories/${newCategory.id}`);
  },
];

// --- UPDATE ---

async function categoryUpdateGet(req, res) {
  const { id } = req.params;
  const category = await db.getCategoryById(id);

  if (!category) throw new CustomNotFoundError("Category not found");

  res.render(
    "category-form", {
      title: "Edit Category",
      category,
      errors: [],
    }
  );
}

const categoryUpdatePost = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 255 }),

  body("description")
    .trim()
    .optional({ values: "falsy" }),

  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const data = {
        title: "Edit Category",
        category: { ...req.body, id },
        errors: errors.array(),
      };

      return res.status(400).render("category-form", data);
    }

    await db.updateCategory(id, req.body);

    res.redirect(`/categories/${id}`);
  },
];

// --- DELETE ---

async function categoryDeleteGet(req, res) {
  const { id } = req.params;
  const category = await db.getCategoryById(id);

  if (!category) throw new CustomNotFoundError("Category not found");

  const items = await db.getItemsByCategoryId(id);

  res.render(
    "category-delete", {
      title: "Delete Category",
      category,
      items,
    }
  );
}

async function categoryDeletePost(req, res) {
  const { id } = req.params;
  const items = await db.getItemsByCategoryId(id);

  if (items.length > 0) {
    const category = await db.getCategoryById(id);

    const data = {
      title: "Delete Category",
      category,
      items,
      error: "Cannot delete a category that still has horses in it. Remove or reassign them first.",
    };

    return res.status(400).render("category-delete", data);
  }

  await db.deleteCategoryById(id);

  res.redirect("/");
}

module.exports = {
  categoryDetailGet,
  categoryCreateGet,
  categoryCreatePost,
  categoryUpdateGet,
  categoryUpdatePost,
  categoryDeleteGet,
  categoryDeletePost,
};