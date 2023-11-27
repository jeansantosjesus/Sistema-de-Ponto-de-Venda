const bodyValidation = (JoiSchema) => async (req, res, next) => {
  try {
    await JoiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      mensagem: error.message,
    });
  }
};

module.exports = { bodyValidation };
