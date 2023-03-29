const db = require("../data/dbconfig");

async function getRecipeById(recipe_id) {

    const rows = await db("recipes as r")
    .join("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("step_ingredients as si", "s.step_id", "si.step_ingredient_id")
    .leftJoin("ingredients as i", "i.ingredient_id", "si.ingredient_id")
    .where("r.recipe_id", recipe_id);
    
    const res = {
        recipe_id: rows[0].recipe_id,
        recipe_name: rows[0].recipe_name,
        created_at: rows[0].created_at
    };

    const steps = rows.reduce( (acc, row) => {
        if(row.step_number)
            acc.steps.push({
                step_id: row.step_id,
                step_number: row.step_number,
                step_instructions: row.step_instructions
            })
        return acc;
    }, {steps: []})

    res.steps = steps;

    return res;
}

module.exports = {getRecipeById};