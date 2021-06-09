var jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuth =async(req,res,next) =>{
try {
    const token = await req.headers["authorization"]
    if(!token){
      return res.status(401).send({errors : [{msg: "No.. ,you are not authorised 1 !"}] })
    }
    const decoded =await jwt.verify(token, process.env.SECRET_KEY) //{ "id": ".", "iat": ., "exp": .. }
    const findUser = await User.findOne({_id:decoded.id})

    if(!findUser){
      return  res.status(401).send({errors : [{msg: "No.. ,you are not authorised 2 !"}]})
    }

    req.user= findUser
    next()

} catch (error) {
      res.status(401).send({errors : [{msg: "No.. ,you are not authorised 3 !"}]})   
}
}
module.exports=isAuth