const database = require("../models/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const ObjectID = require('mongodb').ObjectID;
const shortid = require("shortid");
const signup = async (req, res) => {
  const { name, email, password, repeatedPassword } = req.body;
  if (name && email && password && repeatedPassword) {
    if (password !== repeatedPassword) return res.status(400).send({ errorMsg: "Passwords don't match!" });
    const namespace = await database.getNamespace("users");
    var isPresent = await database.findOne(namespace, { email });
    if (isPresent) return res.status(400).send({ errorMsg: "This Email is Already Registered" });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ errorMsg: "Something went wrong" });
        }

        await database.insertOne(namespace, { name, email, password: hash });
        var user = await database.findOne(namespace, { email });
        jwt.sign({ id: user._id }, config.get("jwtSecret"), { expiresIn: 60 * 60 * 10 }, (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ errorMsg: "Something went wrong" });
          }
          return res.status(200).send({ token });
        });
      });
    });
  } else return res.status(400).send({ errorMsg: "Please Fill in all the Fields" });
};

const login = async (req, res) => {
  const { email, password, remember } = req.body;
  if (email && password) {
    const namespace = await database.getNamespace("users");
    var user = await database.findOne(namespace, { email });
    if (user) {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return res.status(400).send({ errorMsg: "Please Check your Password" });
        jwt.sign({ id: user._id }, config.get("jwtSecret"), { expiresIn: 60 * 60 * 10 }, (err, token) => {
          if (err) throw err;
          return res.status(200).send({ token });
        });
      });
    } else return res.status(400).send({ errorMsg: "This Email is not Registered" });
  } else {
    return res.status(400).send({ errorMsg: "Please Fill in all the fields" });
  }
};
const createQuesions = async (req, res) => {
  const { topic, questions } = req.body;
  const namespace = await database.getNamespace("quizes");
  database.insertOne(namespace, { topic, questions });
  console.log(req.body);
};
const checkQuizeResponse = async (req, res) => {
  const {topic} = req.params;
  const token = req.header('x-auth-token');
  if(!token)return res.status(401).send({errorMsg:'No token, authorization denied'});
  let decoded;
  try{
      decoded = jwt.verify(token,config.get('jwtSecret'));
  }
  catch(e){
      console.log(e);
      return res.status(400).send({errorMsg:'Invalid Token'});
  }
  const userNamespace = await database.getNamespace('users');
  const quizNamespace = await database.getNamespace('quizes');
  const answers = (await database.findOne(quizNamespace,{topic})).questions;
  let correct = 0;
  const response = req.body.answers;
  for (keys in response){
    if(answers[parseInt(keys)-1].correct == response[keys])
      correct++;
  }
  console.log(correct);
  const user = await database.findOne(userNamespace,{_id:new ObjectID(decoded.id),"responses.topic":topic});
  if(!user)
    await userNamespace.updateOne({_id:new ObjectID(decoded.id)},{$push:{responses:{topic:topic,score:correct}}});
  else
    await userNamespace.updateOne({_id:new ObjectID(decoded.id),"responses.topic":topic},{$set:{"responses.$.score":correct}});
  res.send({status:"ok"});
};

module.exports = {
  login,
  signup,
  checkQuizeResponse,
  createQuesions,
};
