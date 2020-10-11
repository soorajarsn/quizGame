const getControllers = require('../controllers/getControllers');
const postControllers = require('../controllers/postControllers');
const router = require('express').Router();
const path = require("path");
//get controllers;
router.route('/api/loadUser').get(getControllers.user);
router.route('/api/questions/:topic').get(getControllers.questions);
router.route('/api/result/:topic').get(getControllers.score);
//post controllers;
router.route('/api/post/signup').post(postControllers.signup);
router.route('/api/post/login').post(postControllers.login);
router.route('/api/post/response/:topic').post(postControllers.checkQuizeResponse);
router.route('/api/post/createQuestions').post(postControllers.createQuesions);
router.route('*').get((req,res)=>{
    res.sendFile(path.join(__dirname+'../../../client/dist/index.html'));
});
module.exports = router;