var express = require('express');
var router = express.Router();

const indexController=require('../controllers/indexController');
const authController=require('../controllers/authController');
const messageController=require('../controllers/messageController');
const userController=require('../controllers/userController');


//displaying index file
router.get('/',indexController.index);

//sign-up route handler
router.get('/sign-up',authController.signup_get);
router.post('/sign-up',authController.signup_post);

//log-in route handler
router.get('/log-in',authController.login_get);
router.post('/log-in',authController.login_post);

//logout route handler
router.get('/log-out',authController.logout_get);


//member
router.get('/member',userController.member_get);
router.post('/member',userController.member_post)

module.exports = router;
