// controllers/itemsController.js
const { body, validationResult } = require("express-validator");

const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

// --- DETAILS ---

async function itemDetailGet(req, res) {
  const { id } = req.params;
  const item = await db.getItemById(id);

  if (!item) throw new CustomNotFoundError("Item not found");

  res.render(
    "item", {
      title: item.name,
      item: item,
    }
  );
}

// --- CREATE ---

async function itemCreateGet(req, res) {
  const categories = await db.getAllCategories();

  res.render(
    "item-form", {
      title: "New Horse",
      item: {},
      categories,
      errors: [],
    }
  );
}

const itemCreatePost = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 255 }),

  body("category_id")
    .notEmpty()
    .withMessage("Category is required")
    .isInt()
    .withMessage("Invalid category"),

  body("age")
    .optional({ values: "falsy" })
    .isInt({ min: 0 })
    .withMessage("Age must be a positive number"),

  body("sex")
    .trim()
    .optional({ values: "falsy" }),

  body("height_hands")
    .optional({ values: "falsy" })
    .isFloat({ min: 0 })
    .withMessage("Height must be a number"),

  body("color")
    .trim()
    .optional({ values: "falsy" }),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("description")
    .trim()
    .optional({ values: "falsy" }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();

      const data = {
        title: "New Horse",
        item: req.body,
        categories,
        errors: errors.array(),
      };

      return res.status(400).render("item-form", data);
    }

    const newItem = await db.createItem(req.body);

    res.redirect(`/items/${newItem.id}`);
  },
];

// --- UPDATE ---

async function itemUpdateGet(req, res) {
  const { id } = req.params;
  const item = await db.getItemById(id);

  if (!item) {
    throw new CustomNotFoundError("Item not found");
  }

  const categories = await db.getAllCategories();

  res.render(
    "item-form", {
      title: "Edit Horse",
      item,
      categories,
      errors: [],
    }
  );
}

const itemUpdatePost = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 255 }),

  body("category_id")
    .notEmpty()
    .withMessage("Category is required")
    .isInt()
    .withMessage("Invalid category"),

  body("age")
    .optional({ values: "falsy" })
    .isInt({ min: 0 })
    .withMessage("Age must be a positive number"),

  body("sex")
    .trim()
    .optional({ values: "falsy" }),

  body("height_hands")
    .optional({ values: "falsy" })
    .isFloat({ min: 0 })
    .withMessage("Height must be a number"),

  body("color")
    .trim()
    .optional({ values: "falsy" }),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("description")
    .trim()
    .optional({ values: "falsy" }),

  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();

      const data = {
        title: "Edit Horse",
        item: { ...req.body, id },
        categories,
        errors: errors.array(),
      };

      return res.status(400).render("item-form", data);
    }

    await db.updateItem(id, req.body);

    res.redirect(`/items/${id}`);
  },
];

// --- DELETE ---

async function itemDeletePost(req, res) {
  res.send(`Item deleted: ${req.params.id}`);
}

module.exports = {
  itemDetailGet,
  itemCreateGet,
  itemCreatePost,
  itemUpdateGet,
  itemUpdatePost,
  itemDeletePost,
};