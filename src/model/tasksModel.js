const mongoose = require('mongoose');
const taskSchema=mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    status:{type:String,require:true}
    },{timestamp:true,versionKey:false})

const taskModel=mongoose.model('tasks',taskSchema);

module.exports=taskModel;