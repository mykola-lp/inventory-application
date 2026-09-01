// controllers/indexController.js

async function indexGet(req, res) {
  res.send("Index page — list of categories");
}

module.exports = { indexGet };