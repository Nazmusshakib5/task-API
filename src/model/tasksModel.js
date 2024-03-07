import mongoose from "mongoose";
const taskSchema=mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    status:{type:String,require:true}
    },{timestamp:true,versionKey:false})

const taskModel=mongoose.Model('tasks',taskSchema);

module.exports=taskModel;