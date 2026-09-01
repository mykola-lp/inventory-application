const express = require("express");
const app = express();

const path = require("node:path");
require('dotenv').config();

const dbPool = require("./db/pool");

const indexRouter = require("./routes/indexRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);

// TEST
dbPool.query("SELECT NOW()")
  .then((result) => console.log("DB connected! Server time:", result.rows[0].now))
  .catch((err) => console.error("DB connection error:", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});