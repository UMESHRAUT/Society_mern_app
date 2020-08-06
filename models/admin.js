const mongoose=require('mongoose');
const crypto=require('crypto');
const adminSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        default:"Admin"
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


adminSchema
    .virtual("password")
    .set(function(password){
        this._password=password;

        this.salt=this.makeSalt();

        this.hashed_password=this.encryptPassword(password)
}).get(function(){
    return this._password;
})


adminSchema.methods={
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



module.exports=Admin=mongoose.model("admin",adminSchema);