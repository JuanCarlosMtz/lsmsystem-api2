const express = require('express');
const router = express.Router();

const AdminsControllers = require('../controllers/admins.js');

// Consultar todos los administradores
router.get('/', AdminsControllers.getAllAdmins);
// Consultar administrador por nombre de usuario
router.get('/:username', AdminsControllers.getAdmin);
// Registrar administrador
router.post('/add', AdminsControllers.addAdmin);
// Autenticar administrador para inicio de sesión
router.post('/login', AdminsControllers.login);
// Actualizar contraseña de empleado
router.post('/setnewpwd', AdminsControllers.setNewPassword);

module.exports = router;