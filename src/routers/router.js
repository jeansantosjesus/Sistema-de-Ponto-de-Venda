const controlador = require("../controllers");
const authenticateUser = require("../middlewares/loginValidation");
const { bodyValidation } = require("../middlewares/joiValidation");
const joiSchemas = require("../utils/joi_schemas");

const router = require("express").Router();

router.post("/login", bodyValidation(joiSchemas.userLogin), controlador.loginUser);
router.post(
    "/usuario",
    bodyValidation(joiSchemas.userRegister),
    controlador.registerUser
);
router.get("/categoria", controlador.getAllcategory);

router.use(authenticateUser);

router.get("/usuario", controlador.getUser);
router.put(
    "/usuario",
    bodyValidation(joiSchemas.userRegister),
    controlador.updateUser
);

router.get("/cliente", controlador.getClients);
router.get("/cliente/:id", controlador.getDetailClient);

router.post(
    "/cliente",
    bodyValidation(joiSchemas.clientRegister),
    controlador.registerClient
);
router.put(
    "/cliente/:id",
    bodyValidation(joiSchemas.clientRegister),
    controlador.updateClient
);

router.post(
    "/produto",
    bodyValidation(joiSchemas.productsRegister),
    controlador.registerProducts
);

router.put(
    "/produto/:id",
    bodyValidation(joiSchemas.productsRegister),

    controlador.updateProducts
);
router.get("/produto", controlador.getProducts);
router.get("/produto/:id", controlador.getDetailProduct);
router.post(
    "/produto",
    bodyValidation(joiSchemas.productsRegister),
    controlador.registerProducts
);
router.put(
    "/produto/:id",
    bodyValidation(joiSchemas.productsRegister),
    controlador.updateProducts
);
router.delete("/produto/:id", controlador.deleteProducts);
router.post(
    "/pedido",
    bodyValidation(joiSchemas.cadastroPedido),
    controlador.makeOrder
);

router.get("/pedido", controlador.getOrder);

module.exports = router;
