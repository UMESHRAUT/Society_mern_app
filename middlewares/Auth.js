const jwt=require('jsonwebtoken');
 
function auth(req,res,next){

    const token=req.header('x-auth-token');
    
    if(!token){
        res.status(401).json({msg:"unauthorize access"})
    }
    
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.member=decode;
        next();
    } catch (error) {
        res.status(400).json({msg:"token is not valid"});    
    }
}

module.exports = auth;
