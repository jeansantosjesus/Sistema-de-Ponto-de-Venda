/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema
    .createTable("categorias", (table) => {
      table.bigIncrements("id").primary().index();
      table.string("descricao").notNullable;

      table.comment("Tabela de categorias");
    })
    .then(() => {
      console.log("Tabela de categorias criada.");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.schema.dropTable("categorias").then(() => {
    console.log("Tabela de categorias dropada.");
  });
};
