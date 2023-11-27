const joi = require("joi");

const clientRegister = joi.object({
  nome: joi
    .string()
    .required()
    .min(3)
    // .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
    .messages({
      "any.required": "O campo nome é obrigatório",
      "string.base": "O campo nome deve ser do tipo string",
      "string.empty": "O campo nome é obrigatório",
      "string.min": "O campo nome deve ter um tamanho mínimo de 3 caracteres.",
      // "string.pattern.base": "O campo nome deve conter apenas letras com ou sem acentuação.",
    }),
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ser em um formato valido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  cpf: joi.string().length(11).required().messages({
    "any.required": "O campo cpf é obrigatório",
    "string.empty": "O campo cpf é obrigatório",
    "string.base": "O campo cpf deve ser do tipo string",
    "string.length": "O campo cpf deve ter 11 caracteres",
  }),
  cep: joi
    .string()
    .length(8)
    // .pattern(/^\d{5}-\d{3}$/)
    .optional()
    .messages({
      "string.base": "O campo cep deve ser do tipo string",
      "string.length": "O campo cep deve ter 8 caracteres no formato '00000000'.",
      // "string.pattern.base": "O campo cep deve ser no formato '00000-000'.",
      "string.empty": "O cep nome não pode ser vazio.",
    }),
  rua: joi.string().max(60).optional().messages({
    "string.base": "O campo rua deve ser do tipo string",
    "string.max": "O campo rua deve ter no máximo 60 caracteres.",
    "string.empty": "O campo rua não pode ser vazio.",
  }),
  numero: joi.string().max(10).optional().messages({
    "string.base": "O campo numero deve ser do tipo string",
    "string.max": "O campo numero deve ter no máximo 10 caracteres.",
    "string.empty": "O campo número não pode ser vazio.",
  }),
  bairro: joi.string().max(60).optional().messages({
    "string.base": "O campo bairro deve ser do tipo string",
    "string.max": "O campo bairro deve ter no máximo 60 caracteres.",
    "string.empty": "O campo bairro não pode ser vazio.",
  }),
  cidade: joi.string().max(50).optional().messages({
    "string.base": "O campo cidade deve ser do tipo string",
    "string.max": "O campo cidade deve ter no máximo 50 caracteres.",
    "string.empty": "O campo cidade não pode ser vazio.",
  }),
  estado: joi.string().max(15).optional().messages({
    "string.base": "O campo estado deve ser do tipo string",
    "string.max": "O campo estado deve ter no máximo 15 caracteres.",
    "string.empty": "O campo estado não pode ser vazio.",
  }),
});

module.exports = clientRegister;
