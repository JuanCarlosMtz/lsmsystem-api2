const AdminsService = require ('../services/admins.js');
const OrgsService = require ('../services/organizations.js');
const EmployeesService = require ('../services/employees.js');
const bcrypt = require('bcrypt');

module.exports = {
    // Consultar a todos los administradores
    getAllAdmins : async (req, res, next) => {
        try {
            const admins = await AdminsService.getAllAdmins();
            res.status(200).json(admins) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting admins. Err: ${err}`});
        }
    },
    // Consultar administrador por nombre de usuario
    getAdmin : async (req, res, next) => {
        try {
            const admin = await AdminsService.getAdmin(req.params.username);
            res.status(200).json(admin)
        } catch (err) {
            res.status(500).json({"message": `Error while getting admin. Err: ${err}`});
        }
    },
    // Registro de administrador
    addAdmin : async (req, res, next) => {
        // Consulta de compañías registradas
        // Si la compañía está registrada y la clave ingresada coincide,
        // se procede, si no, se envía una respuesta informándolo
        const orgs = await OrgsService.getOrgsData()
        let isOrgRegistered = false;
        let orgid = 0;
        for (let i=0; i<orgs.length; i++) {
            if (await bcrypt.compare(req.body.companycode, orgs[i].companycode) && req.body.companyname == orgs[i].name) {
                isOrgRegistered = true;
                orgid = orgs[i].id;
                break;
            }
        }
        if (isOrgRegistered == false) {
            const response = {
                insertId: -1,
                message : "Company not found"
            };
            res.status(200).json(response);
        } else {
            // Si el administrador ya está registrado, se notifica, si no,
            // se procede con el registro
            const users = await AdminsService.getAdmin(req.body.username);
            if (users != 0) {
                const response = {
                    insertId: -1,
                    message : "User already exists"
                };
                res.status(200).json(response);
            } else {
                try {
                    // Registro del administrador con credenciales encriptadas
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const hashedCompanycode = await bcrypt.hash(req.body.companycode, 10);
                    const adminData = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword,
                        companycode: hashedCompanycode,
                        organizationid: orgid
                    };
                    const admin = await AdminsService.addAdmin(adminData);
                    res.status(200).json(admin)
                } catch (err) {
                    res.status(500).json({"message": `Error while getting admin. Err: ${err}`});
                }
            }
        }
    },
    // Autenticación para el inicio de sesión
    login : async (req, res, next) => {
        // Si el usuario no es encontrado, se notifica, de lo contrario,
        // se procede
        const password = await AdminsService.getPassword(req.body.username);
        if (password == 0) {
            const response = [
                {
                    id: -1,
                    message : "User not found"
                }
            ];
            res.status(200).json(response);
        } else {
            // Si la contraseña coincide con la registrada, se envía una respuesta
            // con la información "no sensible" del administrador, de
            // lo contrario, se notifica
            try {
                if (await bcrypt.compare(req.body.password, password[0].password)) {
                    const admin = await AdminsService.getAdmin(req.body.username);
                    res.status(200).json(admin)
                } else {
                    const response = [
                        {
                            id: -1,
                            message : "Not allowed"
                        }
                    ];
                    res.json(response);
                } 
            } catch (err) {
                res.status(500).json({"message": `Error while getting employee. Err: ${err}`});
            }
        }
    },
    // Cambio de contraseña de los empleados por parte del administrador
    setNewPassword : async (req, res, next) => {
        // Verificación de la existencia del usuario en la base de datos
        const employee = await EmployeesService.getEmployee(req.body.username);
        if (employee == 0) {
            const response = [
                {
                    id: -1,
                    message : "User not found",
                    affectedRows: -1
                }
            ];
            res.status(200).json(response);
        } else {
            // Almacenamiento de la nueva contraseña encriptada
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const employeeData = {
                    username: req.body.username,
                    password: hashedPassword,
                };
                const employee = await AdminsService.setNewPassword(employeeData);
                res.status(200).json([employee])
            } catch (err) {
                res.status(500).json({"message": `Error while getting user. Err: ${err}`});
            }
        }
    }
};