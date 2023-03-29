/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  await knex('recipes').insert([
    {recipe_name: "oatmeal"},
    {recipe_name: "pizza"}
  ]);

  await knex("ingredients").insert([
    {ingredient_name: "oats"},
    {ingredient_name: "water"},
    {ingredient_name: "dough"},
    {ingredient_name: "pizza sauce"},
    {ingredient_name: "raw steak"},
    {ingredient_name: "butter"},
    {ingredient_name: "A1"},
    {ingredient_name: "mozzarella cheese"},
    {ingredient_name: "brown sugar"},
    {ingredient_name: "dried fruit"}
  ]);

  await knex("steps").insert([

    //oatmeal steps
    {step_instructions: "Place oats in pan", step_number: 1, recipe_id: 1},   
    {recipe_id:1, step_number: 2, step_instructions: "Add water"},            
    {recipe_id:1, step_number: 3, step_instructions: "Cook the oatmeal"},                  
    {recipe_id:1, step_number: 4, step_instructions: "Add brown sugar"},    
    {
      recipe_id:1, 
      step_number: 5, 
      step_instructions: "Place cooked oatmeal in bowl and top with dried fruit"
    },                                                      
    
    //pizza steps
    {recipe_id:2, step_number: 1, step_instructions: "Toss dough"},         
    {recipe_id:2, step_number: 2, step_instructions: "Top with sauce and cheese"}, 
    {recipe_id:2, step_number: 3, step_instructions: "Bake!"},                           
    {recipe_id:2, step_number: 4, step_instructions: "Slice and serve"}                  

  ]);

  await knex("step_ingredients").insert([
    {step_id: 1, ingredient_id: 1, quantity: 2},
    {step_id: 2, ingredient_id: 2, quantity: 1},
    {step_id: 4, ingredient_id: 9, quantity: 0.3},
    {step_id: 5, ingredient_id: 10, quantity: 1.5},
    {step_id: 6, ingredient_id: 3, quantity: 1},
    {step_id: 7, ingredient_id: 4, quantity: 5},
    {step_id: 7, ingredient_id: 8, quantity: 3}
  ]);

};
