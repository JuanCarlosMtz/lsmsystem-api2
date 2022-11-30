const express = require('express');
const router = express.Router();

const OrgControllers = require('../controllers/organizations.js');

// Consultar todas las organizaciones
router.get('/', OrgControllers.getAllOrgs);
// Consultar organización por ID
router.get('/byid/:id', OrgControllers.getById);
// Verificar el registro de una organización
router.post('/verifyorg', OrgControllers.verifyOrg);
// Registrar organización
router.post('/add', OrgControllers.addOrg);

module.exports = router;