const { validationResult } = require('express-validator');

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Crear un objeto para almacenar solo el primer error por campo
        const filteredErrors = {};
        errors.array().forEach(err => {
            if (!filteredErrors[err.path]) {
                filteredErrors[err.path] = err.msg;
            }
        });

        return res.status(400).json({ errors: filteredErrors });
    }

    next();
};

module.exports = validatorMiddleware;
