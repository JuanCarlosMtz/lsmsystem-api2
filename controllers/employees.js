const EmployeesService = require ('../services/employees.js');
const OrgsService = require ('../services/organizations.js');
const bcrypt = require('bcrypt');

module.exports = {
    // Consultar a todos los empleados
    getAllEmployees : async (req, res, next) => {
        try {
            const employees = await EmployeesService.getAllEmployees();
            res.status(200).json(employees) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting employees. Err: ${err}`});
        }
    },
    // Consultar empleado por nombre de usuario
    getEmployee : async (req, res, next) => {
        try {
            const employee = await EmployeesService.getEmployee(req.params.username);
            res.status(200).json(employee)
        } catch (err) {
            res.status(500).json({"message": `Error while getting employee. Err: ${err}`});
        }
    },
    // Consultar empleados por organización
    getEmployeesByOrg : async (req, res, next) => {
        try {
            const employees = await EmployeesService.getEmployeesByOrg(req.params.orgid);
            res.status(200).json(employees)
        } catch (err) {
            res.status(500).json({"message": `Error while getting employees. Err: ${err}`});
        }
    },
    // Consulta de datos de los empleados por organización, incluyendo estadísticas
    getAllDataByOrg : async (req, res, next) => {
        try {
            const employees = await EmployeesService.getAllDataByOrg(req.params.orgid);
            res.status(200).json(employees)
        } catch (err) {
            res.status(500).json({"message": `Error while getting employees. Err: ${err}`});
        }
    },
    // Registro de nuevo empleado
    addEmployee : async (req, res, next) => {
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
            // Si el empleado ya está registrado, se notifica, si no,
            // se procede con el registro
            const users = await EmployeesService.getEmployee(req.body.username);
            if (users != 0) {
                const response = {
                    insertId: -1,
                    message : "User already exists"
                };
                res.status(200).json(response);
            } else {
                try {
                    // Registro del empleado con credenciales encriptadas
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const hashedCompanycode = await bcrypt.hash(req.body.companycode, 10);
                    const employeeData = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword,
                        companycode: hashedCompanycode,
                        organizationid: orgid
                    };
                    const employee = await EmployeesService.addEmployee(employeeData);
                    res.status(200).json(employee)
                } catch (err) {
                    res.status(500).json({"message": `Error while getting employee. Err: ${err}`});
                }
            }
        }
    },
    // Autenticación para el inicio de sesión
    login : async (req, res, next) => {
        // Si el usuario no es encontrado, se notifica, de lo contrario,
        // se procede
        const password = await EmployeesService.getPassword(req.body.username);
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
            // con la información "no sensible" del empleado, de
            // lo contrario, se notifica
            try {
                if (await bcrypt.compare(req.body.password, password[0].password)) {
                    const employee = await EmployeesService.authEmployee(req.body.username);
                    res.status(200).json(employee)
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
    // Cambio de contraseña
    updatePassword : async (req, res, next) => {
        // Si la contraseña registrada en la base de datos coincide con la
        // ingresada, se registra la nueva tras ser encriptada
        const password = await EmployeesService.getPassword(req.body.username);
        try {
            if (await bcrypt.compare(req.body.oldPassword, password[0].password)) {
                const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
                    const employeeData = {
                        id: req.body.id,
                        password: hashedNewPassword
                    };
                const data = await EmployeesService.updatePassword(employeeData);
                const response = [
                    {
                        affectedRows: data.affectedRows,
                        message: "Updated successfuly"
                    }
                ]
                res.status(200).json(response);
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
            res.status(500).json({"message": `Error while getting data. Err: ${err}`});
        }
    }
};