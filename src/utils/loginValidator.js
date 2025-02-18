// Middleware para validar los datos de inicio de sesión (correo y contraseña)
const loginValidator = (req, res, next) => {
  // Extraemos los valores de email y password del cuerpo de la solicitud
  const { email, password } = req.body;
  const errors = {};
  // Validación del correo electrónico
  if (!email) {
    errors.email = "El correo electrónico es obligatorio"; // Si no hay correo, se agrega un error
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Debe ser una dirección de correo electrónico válida"; // Si el correo no tiene formato válido
  }

  // Validación de la contraseña
  if (!password) {
    errors.password = "La contraseña es obligatoria";
  } else if (password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = loginValidator;
