const ProgressService = require ('../services/progress.js');

module.exports = {
    // Consultar todos los registros de progreso
    getAllProgress : async (req, res, next) => {
        try {
            const progress = await ProgressService.getAllProgress();
            res.status(200).json(progress) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting progress. Err: ${err}`});
        }
    },
    // Consultar registro de progreso por ID de empleado
    getProgress : async (req, res, next) => {
        try {
            const progress = await ProgressService.getProgress(req.params.employeeid);
            res.status(200).json(progress)
        } catch (err) {
            res.status(500).json({"message": `Error while getting progress. Err: ${err}`});
        }
    },
    // Consultar el progreso total de los empleados de una organización
    getTotalProgress : async (req, res, next) => {
        try {
            const progress = await ProgressService.getTotalProgress(req.params.organizationid);
            res.status(200).json(progress)
        } catch (err) {
            res.status(500).json({"message": `Error while getting progress. Err: ${err}`});
        }
    },
    // Crear registro de progreso para nuevo empleado
    createProgress : async (req, res, next) => {
        try {
            const progress = await ProgressService.createProgress(req.body);
            res.status(200).json(progress)
        } catch (err) {
            res.status(500).json({"message": `Error while getting progress. Err: ${err}`});
        }
    },
    // Actualizar estadísticas de progreso
    updateProgress : async (req, res, next) => {
        try {
            const progress = await ProgressService.updateProgress(req.body);
            res.status(200).json(progress)
        } catch (err) {
            res.status(500).json({"message": `Error while getting progress. Err: ${err}`});
        }
    }
};