require("dotenv").config();
const express = require("express");
const router = require("./routers/router");
const Knex = require("./database/knex/index");
const body_parser = require("body-parser");

const PORT = process.env.PORT;

const server = express();

server.use(body_parser.json({ limit: "4mb", extended: true }));
server.use(
    body_parser.urlencoded({ limit: "4mb", extended: true, parameterLimit: 50000 })
);
server.use(body_parser.text({ limit: "4mb" }));

server.use(router);

const startServer = () => {
    server.listen(PORT, () => {
        console.log(`Server listen on port ${PORT}`);
    });
};

if (process.env.IS_LOCALHOST !== "true") {
    console.log("Rodando migrations");

    Knex.migrate
        .latest()
        .then(() => {
            Knex.seed
                .run()
                .then(() => startServer())
                .catch(console.log);
        })
        .catch(console.log);
} else {
    startServer();
}
