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
    createdAt:{
        type:Date,
        default:Date.now()
    }
}
)


module.exports=Society=mongoose.model("Society",societySchema);