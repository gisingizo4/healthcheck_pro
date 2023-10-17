const dbConnection = require('../config/database');

// Save a patient in the database
exports.postPatients = async (req,res)=>{
    try {
        const db = await dbConnection.dbConnection();
        const data={
            patient_name:req.body.patient_name,
            patient_nid: req.body.patient_nid,
            freq_sickness:req.body.freq_sickness
        }
        const params = [data.patient_name, data.patient_nid, data.freq_sickness];
        const sql = ('INSERT INTO patient (patient_name,patient_nid,freq_sickness) VALUES (?,?,?)');
        db.run(sql,params,(err,result)=>{
            if(err){
                return res.status(500).json({"error":err});
                return;
            }
            return res.status(201).json({
                "id":this.lastID,
                "message":"Success",
                "data":data
                
            })
        });
    } catch (error) {
        console.log({error:error})
    }
};

// Get all patients
exports.getAllPatients = async (req,res)=>{
    try {
        const db=await dbConnection.dbConnection();
        var sql="SELECT * FROM patient";
        var params=[];
        db.all(sql,params,(err,rows)=>{
            if(err){
                return res.status(400).json({"error":err.message});
            }
            return res.json({
                message:"success",
                data:rows
            });
        })
    } catch (error) {
        console.log(error);
    }
   
};

// Get patient by ID
exports.getPatientById =async (req,res)=>{
    try {
        var db = await dbConnection.dbConnection();
        var sql= 'SELECT * FROM patient WHERE patient_id = ?';
        const { id } = req.params;        
        db.get(sql,id , (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Patient not found.' });
        }
        return res.json({ patient: row });
        });
    }  
    catch (error) {
        console.log(error);
    }
}

// Update a patient by ID
exports.updatePatient=async (req, res) => {
    try {
        const db=await dbConnection.dbConnection();
        const { id } = req.params;
        const { patient_name, patient_nid, freq_sickness } = req.body;
        var sql= ('UPDATE patient SET patient_name = ?, patient_nid = ?, freq_sickness = ? WHERE patient_id = ?');
        var params=[patient_name, patient_nid, freq_sickness, id];
        
        db.run(sql, params, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({ message: 'Patient updated successfully.' });
        });
    } catch (error) {
        console.log(error)
    }
    
};

// Delete a patient by ID
exports.deletePatient=async (req, res) => {
    try {
        const db=await dbConnection.dbConnection();
        const { id } = req.params;
        var sql=('DELETE FROM patient WHERE patient_id = ?');
        db.run( sql,id, (err) => {
            if (err) {
            return res.status(500).json({ error: err.message });
            }
            return res.json({ message: 'Patient deleted successfully.' });
        });
    } catch (error) {
        console.log(error);
    }
    
};

