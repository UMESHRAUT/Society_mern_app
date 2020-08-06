const mongoose=require('mongoose');
const crypto=require('crypto');
const Schema=mongoose.Schema;
const memberSchema= new Schema({

    member_of:{
        type:Schema.Types.ObjectId,
        ref:"Society"
    },
    name:{
        type:String,
        required:true
    },
    room_no:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true
    },
    complaints:[{
        type:Schema.Types.ObjectId,
        ref:'Complaint'
    }],
    email:{
        type:String,
        required:true,
        unique:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
    },
    resetPasswordLink:{
        data:String,
        default:''
    }
}
)


memberSchema
    .virtual("password")
    .set(function(password){
        this._password=password;

        this.salt=this.makeSalt();

        this.hashed_password=this.encryptPassword(password)
}).get(function(){
    return this._password;
})


memberSchema.methods={
    makeSalt:function(){
        return Math.round(new Date().valueOf() * Math.random() );
    },
    encryptPassword:function(password){
        if(!password) return "";

        try{
            return crypto
            .createHmac("sha1",this.salt)
            .update(password)
            .digest("hex");
        }catch(err){
            return err
        }
    },

    authenticate:function(password){
        return this.encryptPassword(password) == this.hashed_password;
    },
};



module.exports=Member=mongoose.model("Member",memberSchema);