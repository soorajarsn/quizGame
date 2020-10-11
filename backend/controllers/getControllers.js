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

module.exports = {
    user
}