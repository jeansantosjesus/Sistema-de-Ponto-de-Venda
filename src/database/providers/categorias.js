const Knex = require("../knex/index");

const getAllprovider = async () => {
  const result = await Knex("categorias");
  return result;
};

const verifyCategoryProvider = async (id) => {
  const result = await Knex("categorias").where({ id }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

module.exports = { getAllprovider, verifyCategoryProvider };
