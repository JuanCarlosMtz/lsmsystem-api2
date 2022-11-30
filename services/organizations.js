const dbService = require('../config/db.js');

const getAllOrgs = () => {
    sql = `SELECT id, name, reg_date FROM organization`

    return dbService.querypromise(sql);

};

const getById = (id) => {
    sql = `SELECT id, name, reg_date FROM organization WHERE id=${id}`

    return dbService.querypromise(sql);

};

const getOrgsData = () => {
    sql = `SELECT id, name, companycode FROM organization`

    return dbService.querypromise(sql);

};

const getOrg = (name) => {
    sql = `SELECT id, name, reg_date FROM organization WHERE name = '${name}'`

    return dbService.querypromise(sql);

};

const verifyOrg = (body) => {

    const {companycode} = body;

    sql = `SELECT id, name FROM organization
    WHERE companycode = '${companycode}'`

    return dbService.querypromise(sql);
};

const addOrg = (body) => {
    const {name, companycode, reg_date} = body;

    sql = `INSERT INTO organization (name, companycode, reg_date) VALUES ('${name}', '${companycode}', now())`

    return dbService.querypromise(sql);
}


module.exports = {
    getAllOrgs,
    getById,
    getOrgsData,
    getOrg,
    verifyOrg,
    addOrg
}