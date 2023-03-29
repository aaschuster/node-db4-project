const db = require("../data/dbconfig");

async function getRecipeById(recipe_id) {

    const rows = await db("recipes as r")
    .select("r.*", "s.*", "si.ingredient_id", "i.ingredient_name")
    .join("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("step_ingredients as si", "s.step_id", "si.step_ingredient_id")
    .leftJoin("ingredients as i", "i.ingredient_id", "si.ingredient_id")
    .where("r.recipe_id", recipe_id);
    
    let res = {
        recipe_id: rows[0].recipe_id,
        recipe_name: rows[0].recipe_name,
        created_at: rows[0].created_at
    };

    console.log(rows);

    const { steps } = rows.reduce( (acc, row) => {
        if(row.step_number)
            acc.steps.push({
                step_id: row.step_id,
                step_number: row.step_number,
                step_instructions: row.step_instructions
            })
        return acc;
    }, {steps: []})

    res = {...res, steps};

    return res;
}

module.exports = {getRecipeById};