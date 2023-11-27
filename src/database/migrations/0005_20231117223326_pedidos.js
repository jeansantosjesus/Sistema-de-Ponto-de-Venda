/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("pedidos", (table) => {
    table.bigIncrements("id").primary().index();
    table
      .integer("cliente_id")
      .notNullable()
      .index()
      .references("id")
      .inTable("clientes")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
    table.string("observacao").nullable();
    table.integer("valor_total").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("pedidos")
    .then(() => console.log("Tabela de pedidos dropada."));
};
