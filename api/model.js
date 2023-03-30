const db = require("../data/dbconfig");

async function getRecipeById(recipe_id) {

    const rows = await db("recipes as r")
    .select("r.*", "s.*", "si.ingredient_id", "si.quantity", "i.ingredient_name")
    .join("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("step_ingredients as si", "s.step_id", "si.step_id")
    .leftJoin("ingredients as i", "i.ingredient_id", "si.ingredient_id")
    .orderBy("s.step_number")
    .where("r.recipe_id", recipe_id);

    const res = {
        recipe_id: rows[0].recipe_id,
        recipe_name: rows[0].recipe_name,
        steps: rows.reduce( (acc, row) => {

            const stepObj = {
                step_id: row.step_id,
                step_number: row.step_number,
                step_instructions: row.step_instructions,
                ingredients: []
            }

            const ingredientObj = {
                ingredient_id: row.ingredient_id,
                ingredient_name: row.ingredient_name,
                quantity: row.quantity
            }


            if(!row.ingredient_id) {
                return acc.concat(stepObj);
            }

            const currentStep = acc.find(step => step.step_id === row.step_id);

            if(!currentStep) {
                stepObj.ingredients.push(ingredientObj);
                return acc.concat(stepObj);
            }

            currentStep.ingredients.push(ingredientObj);

            return acc;
        }, [])
    }

    return res;
}

module.exports = {getRecipeById};