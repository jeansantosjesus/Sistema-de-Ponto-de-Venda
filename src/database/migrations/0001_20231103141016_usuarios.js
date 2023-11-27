/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema
    .createTable("usuarios", (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome").notNullable();
      table.string("email").notNullable().unique().index();
      table.string("senha").notNullable();

      table.comment("Tabela de usuários");
    })
    .then(() => {
      console.log("Tabela de usuários criada");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.schema.dropTable("usuarios").then(() => {
    console.log("Tabela de usuários dropada.");
  });
};
