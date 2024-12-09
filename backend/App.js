const express = require("express");
const cors = require("cors");
const PORT = 23326;

const app = express();
app.use(express.json()); // parse incoming JSON from the request body
app.use(cors()); // handle request from a frontend that hoisted on a different port or domain

const storagesRoutes = require("./routes/storages_routes");
const unitsRoutes = require("./routes/units_routes");
const categoriesRoutes = require("./routes/categories_routes");
const ingredientsRoutes = require("./routes/ingredients_routes");
const recipesRoutes = require("./routes/recipes_routes");
const ingredientListRoutes = require("./routes/ingredientLists_routes");

app.use("/storages", storagesRoutes);
app.use("/units", unitsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/recipes", recipesRoutes);
app.use("/ingredientLists", ingredientListRoutes);

app.use((req, res, next) => {
  const error = new Error("Could not find this route.");
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured!" });
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
