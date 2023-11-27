/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const [{ count }] = await knex("categorias").count("* as count");
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const categoriasToInsert = categorias.map((categoria) => ({
    descricao: categoria,
  }));
  await knex("categorias").insert(categoriasToInsert);
};

const categorias = [
  "Informática",
  "Celulares",
  "Beleza e Perfumaria",
  "Mercado",
  "Livros e Papelaria",
  "Brinquedos",
  "Moda",
  "Bebê",
  "Games",
];
