const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        return { status: 401, message: 'Usuario no encontrado.' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return { status: 401, message: 'Contraseña incorrecta.' };
    }

    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '4h' });
    return { status: 200, message: 'Login exitoso', token };
};

module.exports = authService;
