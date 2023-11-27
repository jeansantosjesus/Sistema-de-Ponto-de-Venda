const Knex = require("../knex/index");

const verifyUserProvider = async (email) => {
  const result = await Knex("usuarios").where({ email }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

const getUserById = async (id) => {
  const result = await Knex("usuarios").where({ id }).first();
  return result;
};

const createUserProvider = async (nome, email, senha) => {
  const result = await Knex("usuarios")
    .insert({ nome, email, senha })
    .returning("*");

  const { senha: _, ...userRegistered } = result[0];
  return userRegistered;
};

const updateUserProvider = async (id, nome, email, senha) => {
  const result = await Knex("usuarios")
    .update({ nome, email, senha })
    .where({ id });
  if (result > 0) {
    return result;
  } else {
    return 0;
  }
};

module.exports = {
  verifyUserProvider,
  getUserById,
  createUserProvider,
  updateUserProvider,
};
