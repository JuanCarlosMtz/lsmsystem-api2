const OrgsService = require ('../services/organizations.js');
const bcrypt = require('bcrypt');

module.exports = {
    // Consultar todas las organizaciones
    getAllOrgs : async (req, res, next) => {
        try {
            const orgs = await OrgsService.getAllOrgs();
            res.status(200).json(orgs) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting organizations. Err: ${err}`});
        }
    },
    // Consultar organización por ID
    getById : async (req, res, next) => {
        try {
            const org = await OrgsService.getById(req.params.id);
            res.status(200).json(org) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting organization. Err: ${err}`});
        }
    },
    // Verificar la existencia de una organización en la base de datos
    verifyOrg : async (req, res, next) => {
        try {
            const org = await OrgsService.verifyOrg(req.body);
            res.status(200).json(org)
        } catch (err) {
            res.status(500).json({"message": `Error while getting organization. Err: ${err}`});
        }
    },
    // Registrar organización
    addOrg : async (req, res, next) => {
        // Si la companía ya está registrada, se notifica, si no, se procede
        // con la encriptación de su clave y registro
        const org = await OrgsService.getOrg(req.body.name);
        if (org != 0) {
            res.status(400).json({"message": `Org already exists`});
        } else {
            try {
                const hashedCompanycode = await bcrypt.hash(req.body.companycode, 10);
                const orgData = {
                    name: req.body.name,
                    companycode: hashedCompanycode
                };
                const org = await OrgsService.addOrg(orgData);
                res.status(200).json(org)
            } catch (err) {
                res.status(500).json({"message": `Error while getting org. Err: ${err}`});
            }
        }
    }
};