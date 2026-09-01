// routes/categoriesRouter.js

const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/new", categoriesController.categoryCreateGet);
categoriesRouter.post("/new", categoriesController.categoryCreatePost);
categoriesRouter.get("/:id", categoriesController.categoryDetailGet);
categoriesRouter.get("/:id/update", categoriesController.categoryUpdateGet);
categoriesRouter.post("/:id/update", categoriesController.categoryUpdatePost);
categoriesRouter.get("/:id/delete", categoriesController.categoryDeleteGet);
categoriesRouter.post("/:id/delete", categoriesController.categoryDeletePost);

module.exports = categoriesRouter;