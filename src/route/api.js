const userController=require('../controller/userController');

const express=require('express')
const router=express.Router();

router.post('/registration',userController.registration);

module.exports=router;