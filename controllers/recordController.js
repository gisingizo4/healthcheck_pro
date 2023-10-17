const dbConnection= require('../config/database');

exports.saveRecord= async (req,res)=>{
    try {
        const db = await dbConnection.dbConnection();
        const data={
            patient_id:req.body.patient_id,
            heart_rate:req.body.heart_rate,
            temp_rate:req.body.temp_rate
        }
        const sql= 'INSERT INTO patient_record (patient_id,heart_rate,temp_rate) VALUES (?,?,?)';
        const params=[data.patient_id,data.heart_rate,data.temp_rate];
        db.run(sql,params,(err)=>{
            if(err){
                return res.status(500).json({error:err});
            }
            return res.status(201).json({
                message:"Record saved successfully",
                record: data
            })
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getAllRecords =  async (req,res)=>{
    try {
        const db = await dbConnection.dbConnection();
        const sql = 'SELECT * FROM patient_record';
        const params = [];
        db.all(sql,params,(err,rows)=>{
            if(err){
                return res.status(500).json({error:err});
            }
            return res.json({
                message:'Users Found',
                data: rows
            })
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getRecordById = async (req,res)=>{
    try{
        const db =await dbConnection.dbConnection();
        const {id}=req.params;
        const sql= 'SELECT * FROM patient_record WHERE record_id = ?';
        db.get(sql, id,(err,row)=>{
            if(err){
                return res.status(500).json({error:error});
            }
            if(!row){
                return res.status(404).json({message : 'Record not found'});
            }
            return res.json({
                message:'Record Found',
                data: row
            })
        })
    }catch(error){
        console.log({error:error});
    }
}

exports.updateRecord= async(req,res)=>{
    try {
        const db = await dbConnection.dbConnection();
        const {id} = req.params;
        const sql= 'UPDATE patient_record SET patient_id= ? , heart_rate=?, temp_rate=? WHERE record_id = ?';
        const params=[req.body.patient_id,req.body.heart_rate, req.body.temp_rate,id];
        db.run(sql,params,(err)=>{
            if(err){
                return res.status(500).json({error:err});
            }
            return res.status(200).json({
                message:'Record Updated Successfully',
                data: req.body
            })
        })
    } catch (error) {
        console.log({error:error});
    }
}

exports.deleteRecord=async (req,res)=>{
    try {
        const db = await dbConnection.dbConnection();
        const {id}=req.params;
        const sql = 'DELETE FROM patient_record where record_id=?';
        db.run(sql, id, (err)=>{
            if(err){
                return res.status(500).json({error:err});
            }
            return res.status(200).json({
                message: "Record deleted successfully"
            });
            
        });
    } catch (error) {
        console.log({error:error});
    }
}
