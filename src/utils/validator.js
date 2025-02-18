const { validationResult } = require("express-validator");

const validatorMiddleware = (req, res, next) => {
  // Obtener los resultados de la validación en la solicitud
  const errors = validationResult(req);

  // Si hay errores de validación, procesarlos
  if (!errors.isEmpty()) {
    // Crear un objeto para almacenar solo el primer error por campo
    const filteredErrors = {};

    // Iterar sobre el array de errores y almacenar el primer error por campo
    errors.array().forEach((err) => {
      if (!filteredErrors[err.path]) {
        filteredErrors[err.path] = err.msg;
      }
    });

    return res.status(400).json({ errors: filteredErrors });
  }

  next();
};

module.exports = validatorMiddleware;
