/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("produtos", (table) => {
      table.bigIncrements("id").primary().index();
      table.string("descricao").notNullable();
      table.integer("quantidade_estoque").notNullable();
      table.integer("valor").notNullable();

      table
        .integer("categoria_id")
        .notNullable()
        .index()
        .references("id")
        .inTable("categorias")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Tabela de produtos");
    })
    .then(() => {
      console.log("Tabela de produtos criada.");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("produtos")
    .then(() => console.log("Tabela de produtos dropada."));
};
