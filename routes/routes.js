const express = require('express');
const router = express.Router();

router.use('/admins', require('./admins.js')); // Ruta para administradores
router.use('/employees', require('./employees.js')); // Ruta para empleados
router.use('/organizations', require('./organizations.js')); // Ruta para empresas
router.use('/progress', require('./progress.js')); // Ruta para estadísticas de progreso

module.exports = router;