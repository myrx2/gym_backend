const User = require('../models/user.model');

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar al usuario.' });
    }
};

// Iniciar sesión de un usuario
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado.' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta.' });
        }

        res.json({ message: 'Login exitoso' });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
};
