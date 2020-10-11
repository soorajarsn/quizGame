const getControllers = require('../controllers/getControllers');
const postControllers = require('../controllers/postControllers');
const router = require('express').Router();
const path = require("path");
//get controllers;
router.route('/api/loadUser').get(getControllers.user);
//post controllers;
router.route('/api/post/signup').post(postControllers.signup);
router.route('/api/post/login').post(postControllers.login);
router.route('/api/post/quizResponse').post(postControllers.checkQuizeResponse);
router.route('/api/post/createQuestions').post(postControllers.createQuesions);
router.route('*').get((req,res)=>{
    res.sendFile(path.join(__dirname+'../../../client/dist/index.html'));
});
module.exports = router;