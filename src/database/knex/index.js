const { knex } = require("knex");
const pg = require("pg");
require("dotenv").config();

const { development, production, test } = require("./Environment");

if (process.env.NODE_ENV === "production") {
  pg.types.setTypeParser(20, "text", parseInt);
}

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return production;
    case "test":
      return test;
    default:
      return development;
  }
};

const Knex = knex(getEnvironment());

module.exports = Knex;
