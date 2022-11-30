const dbService = require('../config/db.js');

const getAllEmployees = () => {
    sql = `SELECT id, username, email, reg_date, organizationid FROM employee`

    return dbService.querypromise(sql);

};

const getEmployee = (username) => {

    sql = `SELECT id, username, email, reg_date, organizationid FROM employee
    WHERE username = '${username}'`

    return dbService.querypromise(sql);
};

const getPassword = (username) => {

    sql = `SELECT password FROM employee WHERE username = '${username}'`

    return dbService.querypromise(sql);
}

const getEmployeesByOrg = (orgid) => {

    sql = `SELECT id, username, email, reg_date, organizationid FROM employee
    WHERE organizationid = ${orgid}`

    return dbService.querypromise(sql);
};

const getAllDataByOrg = (orgid) => {

    sql = `SELECT employee.id, username, email, reg_date, organizationid, level1, level2, level3 FROM employee INNER JOIN progress on employee.id = progress.employeeid WHERE employee.organizationid = ${orgid}`

    return dbService.querypromise(sql);
};

const addEmployee = (body) => {
    const {username, email, password, companycode, organizationid} = body;

    sql = `INSERT INTO employee (username, email, password, companycode, reg_date, organizationid) VALUES ('${username}', '${email}', '${password}', '${companycode}', now(), ${organizationid})`

    return dbService.querypromise(sql);
}

const authEmployee = (username) => {

    sql = `SELECT employee.id, username, email, organizationid, level1, level2, level3 FROM employee INNER JOIN progress on employee.id = progress.employeeid WHERE username = '${username}'`

    return dbService.querypromise(sql);
}

const updatePassword = (body) => {

    const {password, id} = body;

    sql = `UPDATE employee
           SET password = '${password}'
            WHERE id = ${id}`

    return dbService.querypromise(sql);
};

module.exports = {
    getAllEmployees,
    getEmployee,
    getPassword,
    getEmployeesByOrg,
    getAllDataByOrg,
    addEmployee,
    authEmployee,
    updatePassword
}