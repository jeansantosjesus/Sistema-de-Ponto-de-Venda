const path = require("path");

const development = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, "..", "..", "..", "database.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  pool: {
    afterCreate: (connection, done) => {
      connection.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
};

const test = {
  ...development,
  connection: ":memory:",
};

const production = {
  client: "pg",
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT || 5432),
    ssl: { rejectUnauthorized: false },
  },
};

module.exports = {
  production,
  development,
  test,
};
