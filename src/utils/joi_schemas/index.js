const userLogin = require("./loginUsuario");
const userRegister = require("./cadastroUsuario");
const productsRegister = require("./cadastroProdutos");
const clientRegister = require("./cadastroClientes");
const cadastroPedido = require("./cadastroPedidos");

module.exports = {
    userLogin,
    userRegister,
    productsRegister,
    clientRegister,
    cadastroPedido,
};
