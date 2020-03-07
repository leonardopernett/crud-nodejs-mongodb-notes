const {Router}= require('express');
const router = Router();

const {formSignup, formSignin, signin, signup, logout} = require('../controller/UserController.js')

router.get('/signup',formSignup);
router.get('/signin',formSignin);
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/logout',logout);

module.exports= router;