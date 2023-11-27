const provider = require("../database/providers");
const { htmlCompiler } = require("../utils/email_notifications/compilation_html");
const transporter = require("../utils/email_notifications/email_connection");

const getOrder = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        if (cliente_id) {
            const order = await provider.getOrderById(cliente_id);

            if (!order || order.length === 0) {
                return res.status(404).json({
                    mensagem: "Não existem pedidos para o cliente_id informado.",
                });
            }

            return res.status(200).json(order);
        }

        const allOrders = await provider.getAllOrder();

        return res.status(200).json(allOrders);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const makeOrder = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    const clientExists = await provider.verifyClientsProvider(cliente_id);

    if (!clientExists) {
        return res
            .status(400)
            .json({ mensagem: "Não existe cliente para o id informado." });
    }

    if (pedido_produtos.length === 0) {
        return res.status(400).json({
            mensagem: "Deve ser informado a lista de produtos a ser feito o pedido",
        });
    }
    const productOrder = [];
    for (const orderProduct of pedido_produtos) {
        const result = await provider.verifyProductsIdProvider(
            orderProduct.produto_id
        );

        if (!result) {
            return res.status(400).json({
                mensagem: `Não existe o produto com o id ${orderProduct.produto_id}.`,
            });
        }

        if (result.quantidade_estoque < orderProduct.quantidade_produto) {
            return res.status(400).json({
                mensagem: `Quantidade insuficiente no estoque para o produto "${result.descricao}"`,
            });
        }

        productOrder.push({
            id: result.id,
            quantidade_estoque: result.quantidade_estoque,
            valor: result.valor,
            quantidade: orderProduct.quantidade_produto,
        });
    }

    const registrarPedido = await provider.createOrder(cliente_id, observacao);

    await provider.createOrderProducts(registrarPedido[0].id, productOrder);

    const html = await htmlCompiler("src/utils/email_notifications/pedido.html", {
        destinatario: clientExists.nome,
    });

    transporter.sendMail({
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        to: `${clientExists.nome} <${clientExists.email}>`,
        subject: "Pedido efetuado com sucesso!",
        html,
    });

    return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso!" });
};
module.exports = {
    getOrder,
    makeOrder,
};
