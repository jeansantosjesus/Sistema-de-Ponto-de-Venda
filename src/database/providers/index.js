const { getAllprovider, verifyCategoryProvider } = require("./categorias");

const {
    createUserProvider,
    getUserById,
    updateUserProvider,
    verifyUserProvider,
} = require("./usuarios");
const {
    createProductProvider,
    updateProductProvider,
    verifyProductsIdProvider,
    deleteProductProvider,
    getProduct,
    getAllProducts,
    getAllProductsAndCategory,
    updateProductImage,
} = require("./produtos");
const {
    verifyClientsProvider,
    verifyClientEmail,
    verifyClientCPF,
    createClientProvider,
    updateClientProvider,
    getClient,
    getAllClients,
} = require("./clientes");

const {
    verifyProductForOrder,
    createOrder,
    createOrderProducts,
    getAllOrder,
    getOrderById,
    getOrderProducts,
} = require("./pedidos");

module.exports = {
    getAllprovider,
    createUserProvider,
    getUserById,
    updateUserProvider,
    verifyUserProvider,
    verifyClientsProvider,
    verifyClientEmail,
    verifyClientCPF,
    createClientProvider,
    updateClientProvider,
    createProductProvider,
    verifyCategoryProvider,
    updateProductProvider,
    updateProductImage,
    updateClientProvider,
    verifyProductsIdProvider,
    deleteProductProvider,
    getProduct,
    getAllProducts,
    getAllProductsAndCategory,
    getClient,
    getAllClients,
    verifyProductForOrder,
    createOrder,
    createOrderProducts,
    getAllOrder,
    getOrderById,
    getOrderProducts,
};
