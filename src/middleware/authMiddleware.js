const jwt = require('jsonwebtoken');

module.exports =(req,res,next)=>{
        let token= req.headers['token'];
        jwt.verify(token,'shakib-123',(err,decodedData)=>{
            if(err){
                res.json({msg:"Unathorized",error:err})
            }
            else{
                let email=decodedData['data'];
                req.headers.email=email;
                next();
            }
        })
}