const {Router}= require('express');
const router = Router();

const {index, about} = require('../controller/IndexController.js');

router.get('/', index);
router.get('/about', about);

module.exports= router;