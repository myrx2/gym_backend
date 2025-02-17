const User = require('../models/user.model');

const getUserService = async (req, res) => {
    const { id } = req.params;

    try {
        if (id) {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            return res.status(200).json(user);
        }

        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios.' });
    }
};

module.exports = getUserService;
