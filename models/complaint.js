const mongoose=require('mongoose');

const complaintSchema= new mongoose.Schema({
    society:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Society'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Member'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending",
    },
    filedAt:{
        type:Date,
        default:Date.now()
    },
    closedOn:{
        type:Date,
        default:Date.now()
    }
}
)


module.exports=Complaint=mongoose.model("Complaint",complaintSchema);