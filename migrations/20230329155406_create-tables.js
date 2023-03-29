/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
  .createTable("recipes", table => {
    table.increments("recipes_id")
    table.string("recipe_name")
        .notNullable()
        .unique()
    table.timestamp("created_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
        .notNullable();
  })
  .createTable("ingredients", table => {
    table.increments("ingredients_id")
  })
  
  .createTable("steps", table => {
    table.increments("steps_id")
  })
  
  .createTable("step_ingredients", table => {
    table.increments("step_ingredients_id")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
  .dropTableIfExists("step_ingredients")
  .dropTableIfExists("steps")
  .dropTableIfExists("ingredients")
  .dropTableIfExists("recipes");
};
