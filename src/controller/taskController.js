const taskModel= require('../model/tasksModel');


exports.create=async(req,res)=>{
    try{
        let email=req.headers.email;
        let jsonBody=req.body;
        jsonBody.email=email;
        let task= await taskModel.create(jsonBody)  
        res.json({msg:"Task Created", Task: task})
    }
    catch(err){
        res.json({msg:"Error Task Creation",error:err})
    }

}

exports.read=async(req,res)=>{
    try{
        let email=req.headers['email'];
        let task= await taskModel.find({
            email:email
        })  
        res.json({msg:"Tasks found", Tasks: task})
    }
    catch(err){
        res.json({msg:"Tasks not found",error:err})
    }

}

exports.update=async(req,res)=>{
    try{
        let {id}=req.params;
        let email=req.headers['email'];
        let jsonBody=req.body
        let user= await taskModel.find({email:email,_id:id})  
        if(user.length>0){
            let task= await taskModel.updateOne({_id:id},jsonBody);
            res.json({msg:"Task Updated successfully",task:task})
        }
        else{
            res.json({msg:"Tasks Not found to Update"})
        }
    }
    catch(err){
        res.json({msg:"User not found",error:err})
    }

}

exports.delete=async(req,res)=>{
    try{
        let {id}= req.params;
        let email=req.headers['email'];
        await taskModel.deleteOne({
            email:email,
            _id:id
        })  
        res.json({msg:"Deleted Task Successfully"})
    }
    catch(err){
        res.json({msg:"Task not found to delete",error:err})
    }

}

exports.statusCheck=async(req,res)=>{
    try{
        let {status}=req.params
        let email=req.headers['email'];
        let task= await taskModel.find({
            email:email,
            status:status
        })  
        if(task.length>0){
            res.json({msg:"Task found",task:task })
        }
        else{
            res.json({msg:"Task not found by this status" })
        }

    }
    catch(err){
        res.json({msg:"Error task finding",error:err})
    }

}
