const mongoose=require('mongoose');

const messageSchema= new mongoose.Schema({

    Notice:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Notice'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Member"
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