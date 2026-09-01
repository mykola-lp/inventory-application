// routes/itemsRouter.js

const { Router } = require("express");

const itemsController = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/new", itemsController.itemCreateGet);
itemsRouter.post("/new", itemsController.itemCreatePost);
itemsRouter.get("/:id", itemsController.itemDetailGet);
itemsRouter.get("/:id/update", itemsController.itemUpdateGet);
itemsRouter.post("/:id/update", itemsController.itemUpdatePost);
itemsRouter.get("/:id/delete", itemsController.itemDeleteGet);
itemsRouter.post("/:id/delete", itemsController.itemDeletePost);

module.exports = itemsRouter;