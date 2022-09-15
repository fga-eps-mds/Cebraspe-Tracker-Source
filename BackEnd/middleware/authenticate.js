const Users = require('../models/userSchema');
const jwt = require('jsonwebtoken')
const cors = require('cors');

const authenticate = async (req, res)=>{
   authenticate.use(cors())
   try {
    const token = req.cookies.jwt;
    if(!token){
        res.status(401).send("No token")
    }else{
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Users.findOne({_id : verifyToken._id, "tokens.token" : token})

        if(!rootUser){
            res.status(401).semd("User Not Found")
        }else{
            res.status(200).send("Authorized User")
        }
    }

        next()
   } catch (error) {
        res.status(401).send("Error")
        console.log(error)
   } 
}

module.exports = authenticate;