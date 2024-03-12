const mongoose = require('mongoose');
const taskSchema=mongoose.Schema({
    email:{type:String,require:true},
    title:{type:String,require:true},
    description:{type:String,require:true},
    status:{type:String,require:true}
    },{timestamps:true,versionKey:false})

const taskModel=mongoose.model('tasks',taskSchema);

module.exports=taskModel;