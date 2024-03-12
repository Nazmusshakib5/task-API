const userController=require('../controller/userController');
const taskController=require('../controller/taskController');
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
router.post('/task/create',authMiddleware,taskController.create)
router.get('/task/read',authMiddleware,taskController.read)
router.post('/task/update/:id',authMiddleware,taskController.update)
router.get('/task/delete/:id',authMiddleware,taskController.delete)

router.get('/task/:status',authMiddleware,taskController.statusCheck)

module.exports=router;