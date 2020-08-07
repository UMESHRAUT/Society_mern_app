const mongoose=require('mongoose');

const noticeSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    Society:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Society"
    }
})
module.exports=Notice=mongoose.model("Notice",noticeSchema);