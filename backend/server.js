const express = require("express");
const mongoose = require("mongoose");
const workoutRouter = require("./route/workoutRoute");

require("dotenv").config();

const app = express();
app.use(express.json())




app.use((req,res,next)=>{
    
    console.log(req.method,":",req.path);// Method , Path User want to access
    console.log({user:req.headers['user-agent']});
    next();
})
 
app.use("/api/workout",workoutRouter);



// Connect server and mongoDB database
mongoose.connect(process.env.MONGO_URL_OFLINE)
.then(()=>{
    app.listen(process.env.PORT,process.env.HOST,()=>{
        console.log(`Server running: http://${process.env.HOST}:${process.env.PORT}`);
    })
})
.catch( (error)=>console.log(error.message) )




