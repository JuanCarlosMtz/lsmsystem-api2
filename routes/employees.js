const express = require('express');
const router = express.Router();

const EmployeesControllers = require('../controllers/employees.js');

// Consultar todos los empleados
router.get('/', EmployeesControllers.getAllEmployees);
// Consultar empleado por nombre de usuario
router.get('/:username', EmployeesControllers.getEmployee);
// Consultar todos los empleados por organización
router.get('/byorg/:orgid', EmployeesControllers.getEmployeesByOrg);
// Consultar empleados por organización con estadísticas de progreso
router.get('/alldatabyorg/:orgid', EmployeesControllers.getAllDataByOrg);
// Registrar empleado
router.post('/add', EmployeesControllers.addEmployee);
// Autenticar usuario para inicio de sesión
router.post('/login', EmployeesControllers.login);
// Cambio de contraseña
router.put('/update_password', EmployeesControllers.updatePassword);

module.exports = router;