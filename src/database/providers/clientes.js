const Knex = require("../knex/index");

const verifyClientsProvider = async (id) => {
  const result = await Knex("clientes").where({ id }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

const verifyClientEmail = async (email) => {
  const result = await Knex("clientes").where({ email }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

const verifyClientCPF = async (cpf) => {
  const result = await Knex("clientes").where({ cpf }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

const createClientProvider = async (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
  const result = await Knex("clientes")
    .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
    .returning("*");

  return result[0];
};

const updateClientProvider = async (id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
  const result = await Knex("clientes")
    .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
    .where({ id })
    .returning("*");

  return result[0];
};

const getClient = async (id) => {
  const result = await Knex("clientes").where({ id });

  return result;
};

const getAllClients = async () => {
  const result = await Knex("clientes").orderBy("id", "asc");
  return result;
};

module.exports = {
  verifyClientsProvider,
  createClientProvider,
  updateClientProvider,
  verifyClientEmail,
  verifyClientCPF,
  getClient,
  getAllClients,
};
