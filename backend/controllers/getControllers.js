const database = require("../models/database");
const config = require('config');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

const user = async (req,res) => {
    const token = req.header('x-auth-token');
    if(!token)return res.status(401).send({errorMsg:'No token, authorization denied'});
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        let user = await database.findOne(await database.getNamespace('users'),{_id:new ObjectID(decoded.id)});
        let userData = {
            userName:user.name,
            userId:user._id
        }
        res.set('Cache-Control','no-store');
        return res.status(200).send({...userData});
    }
    catch(e){
        console.log(e);
        return res.status(400).send({errorMsg:'Invalid Token'});
    }

}
const questions = async (req,res) => {
    const {topic} = req.params;
    const namespace = await database.getNamespace('quizes');
    const details = await database.findOne(namespace,{topic});
    const response = details.questions.map(question => ({question:question.question,options:question.options}));
    // console.log(response);
    res.set('Cache-Control','no-store');
    res.status(200).send({questions:response});
}
const score = async (req,res) => {
    const {topic} = req.params;
    const namespace = await database.getNamespace('users');
    const token = req.header('x-auth-token');
    if(!token)return res.status(401).send({errorMsg:'No token, authorization denied'});
    let decoded;
    try{
        decoded = jwt.verify(token,config.get('jwtSecret'));
    }
    catch(err){
        console.log(err);
        return res.status(401).send({errorMsg:"Unauthenticated"});
    }
    const user = await database.findOne(namespace,{_id:new ObjectID(decoded.id)});
    const responses = user.responses;
    let score = null;
    responses.forEach(r => {
        if(r.topic == topic) score = r.score;
    });
    if(score)
        return res.status(200).send({score});
    else return res.status(400).send({errorMsg:'Bad Request'});
}
module.exports = {
    user,
    questions,
    score
}