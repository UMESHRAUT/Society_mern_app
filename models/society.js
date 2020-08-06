const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const societySchema= new Schema({

    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    reg_no:{
        type:String,
        required:true
    },
    members:[{
        type:Schema.Types.ObjectId,
        ref:"Member"
    }],
    notice:[{
        type:Schema.Types.ObjectId,
        ref:"Notice"
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
}
)


module.exports=Society=mongoose.model("Society",societySchema);