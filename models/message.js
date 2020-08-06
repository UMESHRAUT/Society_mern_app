const mongoose=require('mongoose');

const messageSchema= new mongoose.Schema({

    forNotice:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Notice'
    },
    owner:{
    type:String,
    required:true
    },
    msg:{
        type:String,
        required:true
    },
    filedAt:{
        type:Date,
        default:Date.now()
    }
}
)


module.exports=Message=mongoose.model("Message",messageSchema);