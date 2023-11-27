const joi = require("joi");

const productsRegister = joi.object({
    descricao: joi.string().empty().required().messages({
        "any.required": "O campo descricao é obrigatório",
        "string.empty": "O campo descricao não pode ser vazio",
    }),
    quantidade_estoque: joi
        .number()
        .positive()
        .integer()
        .strict()
        .required()
        .messages({
            "any.required": "O campo quantidade_estoque é obrigatório",
            "number.base": "O campo quantidade_estoque precisa ser um número",
            "number.positive": "A quantidade de estoque deve ser um número positivo",
            "number.integer": "A quantidade em estoque deve ser um número inteiro.",
        }),
    valor: joi.number().positive().integer().strict().required().messages({
        "any.required": "O campo valor é obrigatório",
        "number.base": "O campo valor precisa ser um número",
        "number.positive": "A valor deve ser um número positivo",
        "number.integer": "A valor deve ser um número inteiro.",
    }),
    categoria_id: joi.number().required().strict().messages({
        "any.required": "O campo categoria_id é obrigatório",
        "number.base": "O campo categoria_id precisa ser um número",
    }),
    produto_imagem: joi.string().empty().optional().messages({
        "string.base": "O campo produto_imagem deve ser do tipo string",
        "string.empty": "O campo produto_imagem não pode ser vazio",
    }),
});

module.exports = productsRegister;
