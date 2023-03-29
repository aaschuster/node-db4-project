const db = require("../data/dbconfig");

async function getRecipeById(recipe_id) {
    const rows = await db("recipes as r")
    .join("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("step_ingredients as si", "s.step_id", "si.step_ingredient_id")
    .leftJoin("ingredients as i", "i.ingredient_id", "si.ingredient_id")
    .where("r.recipe_id", recipe_id);
    return rows;
}

module.exports = {getRecipeById};