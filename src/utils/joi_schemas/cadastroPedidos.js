const joi = require("joi");

const orderRegister = joi.object({
    cliente_id: joi.number().integer().strict().positive().required().messages({
        "any.required": "O campo cliente_id é obrigatório",
        "number.base": "O campo cliente_id precisa ser um número",
        "number.integer": "O campo cliente_id deve ser um inteiro válido",
        "number.positive": "O campo cliente_id precisa ser um número positivo",
    }),
    observacao: joi.string().messages({
        "string.base": "O campo observação deve ser uma string",
    }),

    pedido_produtos: joi
        .array()
        .items(
            joi.object({
                produto_id: joi
                    .number()
                    .integer()
                    .strict()
                    .positive()
                    .required()
                    .messages({
                        "any.required": "O campo produto_id é obrigatório",
                        "number.base": "O campo produto_id precisa ser um número",
                        "number.integer":
                            "O campo produto_id deve ser um inteiro válido",
                        "number.positive":
                            "O campo produto_id precisa ser um número positivo",
                    }),
                quantidade_produto: joi
                    .number()
                    .min(1)
                    .strict()
                    .integer()
                    .positive()
                    .required()
                    .messages({
                        "any.required": "O campo quantidade_produto é obrigatório",
                        "number.integer":
                            "O campo quantidade_produto deve ser um inteiro válido",
                        "number.positive":
                            "O campo quantidade_produto precisa ser um número positivo",
                        "number.min": "A quantidade deve ser no mínimo 1",
                    }),
                valor_produto: joi.number().positive().messages({
                    "number.base": "O campo valor_produto precisa ser um número",
                    "number.positive":
                        "O campo valor_produto deve ser um número positivo",
                }),
            })
        )
        .min(1)
        .required()
        .messages({
            "any.required": "O campo pedido_produtos é obrigatório",
            "array.min": "Ao menos um produto deve ser informado",
        }),
});

module.exports = orderRegister;
