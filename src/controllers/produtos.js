const provider = require("../database/providers");
const { uploadFile, deleteFile } = require("../utils/storage/backblaze/service");

const registerProducts = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } =
        req.body;

    try {
        const verifyCategory = await provider.verifyCategoryProvider(categoria_id);

        if (!verifyCategory) {
            return res
                .status(404)
                .json({ mensagem: "O id da categoria informada não existe." });
        }

        const product = await provider.createProductProvider(
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        );

        if (produto_imagem) {
            try {
                const testBase64 =
                    /^data:image\/([A-Za-z-+\/]+);base64,(.+)$([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

                const isBase64valid = testBase64.test(produto_imagem);

                if (!isBase64valid) {
                    return res.status(400).json({
                        messagem:
                            "Informe uma string no formato base64 no campo produto_imagem.",
                    });
                }

                const base64DataFile = new Buffer.from(
                    produto_imagem.replace(/^data:image\/\w+;base64,/, ""),
                    "base64"
                );

                const fileType = produto_imagem.split(";")[0].split("/")[1];

                const imageName = `image-${Date.now().toString()}`;

                const file = await uploadFile(
                    `produtos/${product.id}/${imageName}.${fileType}`,
                    base64DataFile,
                    "base64",
                    fileType
                );

                await provider.updateProductImage(product.id, file.Location);
                const result = await provider.verifyProductsIdProvider(product.id);
                return res.status(201).json(result);
            } catch (error) {
                return res
                    .status(500)
                    .json({ mensagtem: "Erro interno do servidor." });
            }
        }

        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
};

const updateProducts = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } =
        req.body;
    const id = req.params.id;

    try {
        const verifyCategoria = await provider.verifyCategoryProvider(categoria_id);

        const verifyProduct = await provider.verifyProductsIdProvider(id);

        if (!verifyCategoria) {
            return res
                .status(400)
                .json({ mensagem: "Não existe categoria para o id informado." });
        }
        if (!verifyProduct) {
            return res
                .status(400)
                .json({ mensagem: "Não existe produto para o id informado." });
        }

        const product = await provider.updateProductProvider(
            id,
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        );

        if (produto_imagem) {
            try {
                const testBase64 =
                    /^data:image\/([A-Za-z-+\/]+);base64,(.+)$([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

                const isBase64valid = testBase64.test(produto_imagem);

                if (!isBase64valid) {
                    return res.status(400).json({
                        messagem:
                            "Informe uma string no formato base64 no campo produto_imagem.",
                    });
                }

                const base64DataFile = new Buffer.from(
                    produto_imagem.replace(/^data:image\/\w+;base64,/, ""),
                    "base64"
                );

                const fileType = produto_imagem.split(";")[0].split("/")[1];

                const imageName = `image-${Date.now().toString()}`;

                const file = await uploadFile(
                    `produtos/${product.id}/${imageName}.${fileType}`,
                    base64DataFile,
                    "base64",
                    fileType
                );

                await deleteFile(verifyProduct.produto_imagem);

                await provider.updateProductImage(product.id, file.Location);

                const result = await provider.verifyProductsIdProvider(product.id);

                return res.status(201).json(result);
            } catch (error) {
                return res
                    .status(500)
                    .json({ mensagtem: "Erro interno do servidor." });
            }
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
};

const deleteProducts = async (req, res) => {
    const id = req.params.id;

    try {
        const verifyProduct = await provider.verifyProductsIdProvider(id);
        const verifyProductInOrders = await provider.getOrderProducts(id);

        if (verifyProductInOrders.length > 0) {
            return res.status(400).json({
                mensagem:
                    "O produto não pode ser excluído porque está cadastrado em algum pedido.",
            });
        }

        if (!verifyProduct) {
            return res
                .status(404)
                .json({ mensagem: "Não existe produto para o id informado." });
        }

        if (verifyProduct.produto_imagem) {
            await deleteFile(verifyProduct.produto_imagem);
        }

        await provider.deleteProductProvider(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
};

const getProducts = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        if (categoria_id) {
            const products = await provider.getAllProductsAndCategory(categoria_id);
            if (products.length === 0) {
                return res.status(400).json({
                    mensagem:
                        "Não existe produto cadastrado com a id de categoria informada.",
                });
            }
            return res.status(200).json(products);
        }

        const productWithoutFilter = await provider.getAllProducts();
        return res.status(200).json(productWithoutFilter);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
};

const getDetailProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const detailProduct = await provider.getProduct(id);

        if (detailProduct.length === 0) {
            return res
                .status(404)
                .json({ mensagem: "Não existe produto para o id informado." });
        }
        return res.status(200).json(detailProduct[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
};

module.exports = {
    registerProducts,
    updateProducts,
    deleteProducts,
    getProducts,
    getDetailProduct,
};
