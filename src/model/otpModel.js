import mongoose from "mongoose";
const otpSchema=mongoose.Schema({
    email:{type:String,require:true},
    otp:{type:String,require:true},
    status:{type:String,require:true}
    },{timestamp:true,versionKey:false})

const otpModel=mongoose.Model('otps',otpSchema);

module.exports=otpModel;