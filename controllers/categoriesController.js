// controllers/categoriesController.js

async function categoryDetailGet(req, res) {
  res.send(`Category detail: ${req.params.id}`);
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