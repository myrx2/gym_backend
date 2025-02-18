const loginValidator = (req, res, next) => {
    const { email, password } = req.body;
    const errors = {};

    if (!email) {
        errors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Debe ser una dirección de correo electrónico válida';
    }

    if (!password) {
        errors.password = 'La contraseña es obligatoria';
    } else if (password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = loginValidator;
