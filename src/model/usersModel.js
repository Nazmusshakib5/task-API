const mongoose = require('mongoose');
const userSchema=mongoose.Schema({
    email:{type:String,unique:true,require:true},
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    mobile:{type:String,unique:true,require:true},
    password:{type:String,require:true},
    },{timestamps:true,versionKey:false})

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;