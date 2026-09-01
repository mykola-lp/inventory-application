// controllers/itemsController.js
const db = require("../db/queries");

const CustomNotFoundError = require("../errors/CustomNotFoundError");

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

async function itemCreateGet(req, res) {
  res.send("Item create form");
}

async function itemCreatePost(req, res) {
  res.send("Item created");
}

async function itemUpdateGet(req, res) {
  res.send(`Item update form: ${req.params.id}`);
}

async function itemUpdatePost(req, res) {
  res.send(`Item updated: ${req.params.id}`);
}

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