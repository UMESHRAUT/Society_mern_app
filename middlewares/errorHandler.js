const logger = require("./logger")

module.exports=function(err,req,res,next){
  logger.error(err);
  res.status(500);
  res.send("invalid api request");   
}