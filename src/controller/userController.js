const usersModel =require('../model/usersModel');
const otpsModel =require('../model/otpModel');
const jwt = require('jsonwebtoken');
const SendEmailUtility=require('../utility/emailSendUtility')

exports.registration=async (req,res)=>{
    try{
        const jsonBody = req.body;
        await usersModel.create(jsonBody);
        res.json({status:"201",msg:"Successfully registration completed and created a user."})
    }
    catch{
        res.json({status:"Failed",msg:"User is not registerd yet."}) 
    }

}


exports.login= async(req,res)=>{

    try{
        const jsonBody = req.body;
        const user=await usersModel.find({
            email:jsonBody['email'],
            password:jsonBody['password']
        }).count('total');
        if(user>0){
            let payload={exp:Math.floor(Date.now()/1000)+(24*60*60),data:jsonBody['email']}
            let token=jwt.sign(payload,'shakib-123')
            res.json({status:"found",msg:"User found successfully",token:token})
        }else{
            res.json({status:" Not found",msg:"User Not found"})
        }
    }
    catch{
        res.json({status:"Failed",msg:"User is not found."}) 
    }
}


exports.profileDetails=async(req,res)=>{
    try{
        let email=req.headers.email;
        let user= await usersModel.find({
            email:email
        })  
        res.json({msg:"User found", user: user})
    }
    catch(err){
        res.json({msg:"User not found",error:err})
    }

}


exports.profileUpdate= async(req,res)=>{
    try{
        let email=req.headers.email;
        let jsonBody=req.body
        await usersModel.updateOne({email:email},jsonBody)  
        res.json({msg:"Updation Complete"})
    }
    catch(err){
        res.json({msg:"Can't Update user not found",error:err})
    }

}


exports.verifyEmail=async (req,res)=>{
    try{
        const {email}= req.params;
    let user= await usersModel.find({email:email})
    if(user.length>0){
        let Otp= Math.floor(100000+Math.random()*900000)
        await SendEmailUtility(email,`Your OTP is ${Otp}`,"From Nazmus shakib")
        await otpsModel.create({email:email,otp:Otp,status:"active"})
        res.json({status:"success",msg:"email verified"})
    }
    else{
        res.json({msg:'Email is not verified'})
    }

    }catch{
        res.json({msg:"Can't verify email",error:err})
    }
}


exports.verifyOtp=async(req,res)=>{
    try{
        const {email,otp}= req.params;
    let user= await otpsModel.find({email:email,otp:otp,status:"active"})
    if(user.length>0){
        await otpsModel.updateOne({email:email,otp:otp},{status:"verified"})
        res.json({status:"success",msg:"otp verified"})
    }
    else{
        res.json({msg:'otp is not verified'})
    }

    }catch{
        res.json({msg:"Can't verify otp",error:err})
    }
}


exports.passwordReset=async(req,res)=>{
    try{
        const {email,otp,password}= req.params;
    let user= await otpsModel.find({email:email,otp:otp,status:"verified"})
    console.log(user.length)
    if(user.length>0){
        await otpsModel.deleteOne({email:email,otp:otp,status:"verified"})
        await usersModel.updateOne({email:email},{password:password})
        res.json({status:"success",msg:"password updated"})
    }
    else{
        res.json({msg:'password is not updated'})
    }

    }catch{
        res.json({msg:"Can't updated password",error:err})
    }
}