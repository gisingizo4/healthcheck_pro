const { saveRecord, getAllRecords, getRecordById, deleteRecord, updateRecord } = require('../controllers/recordController');
const recordRouter = require('express').Router();

recordRouter.post('/record/create',saveRecord);
recordRouter.get('/record/getall',getAllRecords)
recordRouter.get('/record/:id',getRecordById);
recordRouter.put('/record/:id',updateRecord);
recordRouter.delete('/record/:id',deleteRecord);
module.exports=recordRouter;