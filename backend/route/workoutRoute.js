const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Workout = require("../schema/workoutSchema");
// GET
router.get("/",async(req,res)=>{
    const response = await Workout.find().sort({createdAt:-1});
    res.json(response)
})
// POST
router.post("/",async(req,res)=>{
    const { title,load,reps } = req.body;
    let emptyFields = []
    if(!title){
        emptyFields.push("title")
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:"Please fill in all the fields",emptyFields})
    }

    try{
        const workout = await Workout.create({title,load,reps});
        res.status(200).json(workout);
    }catch(error){
        res.status(404).json({error:error.message})
    }
})
// GET ONE
router.get("/:id",async(req,res)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Id not valid"})
    }
    const workout = await Workout.findById({ _id:id });
    if(!workout){
        return res.status(404).json({error:"Id not valid"})
    }
    res.status(200).json(workout);
})
// UPDATE
router.patch("/:id",async(req,res)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Id not valid"});
    }
    try{
        const workout = await Workout.findOneAndUpdate({_id:id},{ ...req.body });
        res.status(200).json(workout);
    }catch(error){
        res.status(404).json({error:error.message});
    }

})
// DELETE
router.delete("/:id",async(req,res)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Id not valid"});
    }
    try{
        const workout = await Workout.findOneAndDelete({ _id:id });
        res.status(200).json(workout);
    }catch(error){
        res.status(404).json({error:"Id is not valid"})
    }

})


module.exports = router;