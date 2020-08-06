const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')


dotenv.config({path:'./config/config.env'})
exports.authorize=(req,res,next)=>{
    jwt.verify(req.headers.authorization,process.env.JWT_SECRET,(err)=>{
        if(err){
            return res.status(401).json({error:"Unauthorized ccess"})
        }
        next();
    })
}