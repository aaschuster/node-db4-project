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
    {}
  ]);

  await knex("").insert([
    {}
  ]);

  await knex("").insert([
    {}
  ]);

};
