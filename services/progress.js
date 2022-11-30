const dbService = require('../config/db.js');

const getAllProgress = () => {
    sql = `SELECT * FROM progress`

    return dbService.querypromise(sql);

};

const getProgress = (employeeid) => {

    sql = `SELECT * FROM progress
    WHERE employeeid = ${employeeid}`

    return dbService.querypromise(sql);
};

const getTotalProgress = (organizationid) => {

    sql = `SELECT SUM(level1 + level2 + level3) totalProgress, count(*) totalEmp FROM progress INNER JOIN employee on employee.id = progress.employeeid WHERE employee.organizationid = ${organizationid}`

    return dbService.querypromise(sql);
};

const createProgress = (body) => {
    const {level1, level2, level3, employeeid} = body;

    sql = `INSERT INTO progress (level1, level2, level3, employeeid) VALUES (${level1}, ${level2}, ${level3}, ${employeeid})`

    return dbService.querypromise(sql);
};

const updateProgress = (body) => {

    const {level1, level2, level3, employeeid} = body;

    sql = `UPDATE progress
           SET level1 = ${level1},
               level2 = ${level2},
               level3 = ${level3}
            WHERE employeeid = ${employeeid}`

    return dbService.querypromise(sql);
};

module.exports = {
    getAllProgress,
    getProgress,
    getTotalProgress,
    createProgress,
    updateProgress
}