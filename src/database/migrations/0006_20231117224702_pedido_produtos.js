/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("pedido_produtos", (table) => {
    table.bigIncrements("id").primary().index();
    table
      .integer("pedido_id")
      .notNullable()
      .index()
      .references("id")
      .inTable("pedidos")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
    table
      .integer("produto_id")
      .notNullable()
      .index()
      .references("id")
      .inTable("produtos")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
    table.integer("quantidade_produto").notNullable();
    table.integer("valor_produto").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema
    .dropTable("pedido_produtos")
    .then(() => console.log("Tabela pedido_produtos dropada."));
};
