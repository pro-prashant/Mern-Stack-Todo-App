
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8002;
             require('./Models/db');
const TaskRouter = require('./Routes/TaskRoute');
const bodyParser = require('body-parser');
const cors = require('cors');



app.get('/',(req,res)=>{
         res.send("Hello Would");
})
app.use(cors());
app.use(bodyParser.json());
app.use('/task',TaskRouter);
app.listen(PORT,()=>{
    console.log(`Server is Start Port ${PORT}`)
})

