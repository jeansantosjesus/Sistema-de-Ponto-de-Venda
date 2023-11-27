/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("clientes", (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome").notNullable();
      table.string("email").unique().notNullable();
      table.string("cpf", 11).checkLength("=", 11).unique().notNullable();
      table.string("cep").nullable();
      table.string("rua").nullable();
      table.string("numero").nullable();
      table.string("bairro").nullable();
      table.string("cidade").nullable();
      table.string("estado").nullable();

      table.comment("Tabela de clientes.");
    })
    .then(() => {
      console.log("Tabela de clientes criada.");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("clientes")
    .then(() => console.log("Tabela de clientes dropada."));
};
