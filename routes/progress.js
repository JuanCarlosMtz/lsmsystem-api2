const express = require('express');
const router = express.Router();

const ProgressControllers = require('../controllers/progress.js');

// Consultar todas las estadísticas de progreso
router.get('/', ProgressControllers.getAllProgress);
// Consultar estadísticas de progreso por ID de empleado
router.get('/:employeeid', ProgressControllers.getProgress);
// Consultar el progreso total de los empleados de una organización
router.get('/total/progress/:organizationid', ProgressControllers.getTotalProgress);
// Crear registro de progreso para un nuevo empleado
router.post('/create', ProgressControllers.createProgress);
// Actualizar estadísticas de progreso por empleado
router.put('/update', ProgressControllers.updateProgress);

module.exports = router;