const joi = require("joi");

const userLogin = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ser em um formato valido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
    "string.min": "A senha precisa conter, no mínimo, 5 caracteres",
  }),
});

module.exports = userLogin;
