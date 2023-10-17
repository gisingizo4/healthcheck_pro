const patientRouter = require('express').Router();
const {getAllPatients, postPatients, getPatientById, updatePatient, deletePatient} = require('../controllers/patientController');

patientRouter.post('/patient/create', postPatients);
patientRouter.get('/patient/getAll', getAllPatients);
patientRouter.get('/patient/:id', getPatientById);
patientRouter.put('/patient/:id', updatePatient);
patientRouter.delete('/patient/:id', deletePatient);

module.exports = patientRouter; 