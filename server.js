const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
var {dbConnection} = require('./config/database');
const patientRouter = require('./routes/patientRoutes');
const recordRouter = require('./routes/recordRoutes');

app.use(bodyParser.json());
app.use('/api', patientRouter);
app.use('/api',recordRouter);

app.listen(process.env.PORT,()=>{
    console.log({Port_Connection : "Established"});
})  

app.get('/',(req,res)=>{
    res.send("Welcome on HealthCheck Pro Plus");
})

dbConnection();

