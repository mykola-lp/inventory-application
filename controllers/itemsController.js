// controllers/itemsController.js

async function itemDetailGet(req, res) {
  res.send(`Item detail: ${req.params.id}`);
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