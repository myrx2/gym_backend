const mongoose = require('mongoose');
const User = require('../models/user.model');

const deleteUserService = async (req, res) => {
    const { id } = req.params;

    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar al usuario
        await User.deleteOne({ _id: id });
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar al usuario.' });
    }
};

module.exports = deleteUserService;
