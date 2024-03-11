const userController=require('../controller/userController');
const authMiddleware=require('../middleware/authMiddleware');

const express=require('express')
const router=express.Router();

//before login
router.post('/registration',userController.registration);
router.post('/login',userController.login);

router.get('/verifyEmail/:email',userController.verifyEmail);
router.get('/verifyOtp/:email/:otp',userController.verifyOtp);
router.post('/resetPassword/:email/:otp/:password',userController.passwordReset);

//after login
router.post('/profileUpdate',authMiddleware,userController.profileUpdate);
router.get('/profileDetails',authMiddleware,userController.profileDetails);

//Task Routing after login process

module.exports=router;