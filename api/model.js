const db = require("../data/dbconfig");

async function getRecipeById(recipe_id) {

    const rows = await db("recipes as r")
    .select("r.*", "s.*", "si.ingredient_id", "si.quantity", "i.ingredient_name")
    .join("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("step_ingredients as si", "s.step_id", "si.step_id")
    .leftJoin("ingredients as i", "i.ingredient_id", "si.ingredient_id")
    .orderBy("s.step_number")
    .where("r.recipe_id", recipe_id);
    
    let res = {
        recipe_id: rows[0].recipe_id,
        recipe_name: rows[0].recipe_name,
        created_at: rows[0].created_at
    };

    const steps = [{
        step_id: rows[0].step_id,
        step_number: rows[0].step_number,
        step_instructions: rows[0].step_instructions,
        ingredients: []
    }];

    rows.forEach ( row => {
        if(!row.step_id) return;
        let stepExists = false;
        steps.forEach( step => {
            if(step.step_id === row.step_id) {
                stepExists = true;
            }
        })
        if (!stepExists) {
            steps.push({
                step_id: row.step_id,
                step_number: row.step_number,
                step_instructions: row.step_instructions,
                ingredients: []                
            })
        }
    })

    rows.forEach (row => {
        if(row.ingredient_id) {
            steps.forEach ( step => {
                if(row.step_id === step.step_id) {
                    step.ingredients.push({
                        ingredient_id: row.ingredient_id,
                        ingredient_name: row.ingredient_name,
                        quantity: row.quantity
                    })
                }
            })
        }
    })

    res = {...res, steps};

    return res;
}

module.exports = {getRecipeById};