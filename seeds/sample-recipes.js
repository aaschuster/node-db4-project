/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  // Deletes ALL existing entries
  await knex('recipes').truncate()
  await knex('ingredients').truncate()
  await knex('steps').truncate()
  await knex('step_ingredients').truncate()
  
  await knex('recipes').insert([
    {recipe_name: "oatmeal"},
    {recipe_name: "pizza"},
    {recipe_name: "steak"}
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
    {step_instructions: "Place oats in pan", step_number: 1, recipe_id: 1, quantity: 2},   //id1
    {recipe_id:1, step_number: 2, step_instructions: "Add water", quantity: 1},            //id2
    {recipe_id:1, step_number: 3, step_instructions: "Cook the oatmeal"},                  //id3
    {recipe_id:1, step_number: 4, step_instructions: "Add brown sugar", quantity: 0.3},    //id4
    {
      recipe_id:1, 
      step_number: 5, 
      step_instructions: "Place cooked oatmeal in bowl and top with dried fruit",          //id5
      quantity: 1.5
    },                                                      
    
    //pizza steps
    {recipe_id:2, step_number: 1, step_instructions: "Toss dough", quantity: 1},         //id6
    {recipe_id:2, step_number: 2, step_instructions: "Put sauce on dough", quantity: 5}, //id7
    {recipe_id:2, step_number: 3, step_instructions: "Top with cheese", quantity: 3},    //id8
    {recipe_id:2, step_number: 4, step_instructions: "Bake!"},                           //id9
    {recipe_id:2, step_number: 5, step_instructions: "Slice and serve"}                  //id10

  ]);

  await knex("step_ingredients").insert([
    {step_id: 1, ingredient_id: 1},
    {step_id: 2, ingredient_id: 2},
    {step_id: 4, ingredient_id: 9},
    {step_id: 5, ingredient_id: 10},
    {step_id: 6, ingredient_id: 3},
    {step_id: 7, ingredient_id: 4},
    {step_id: 8, ingredient_id: 8}
  ]);

};
