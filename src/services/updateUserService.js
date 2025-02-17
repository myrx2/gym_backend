const User = require('../models/user.model');

const updateUserService = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar al usuario.' });
    }
};

module.exports = updateUserService;
