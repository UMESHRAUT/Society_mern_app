const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')
const _ =require('lodash');
const Admin = require('../models/admin');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "rautumesh300@gmail.com",
      pass: process.env.mailPassword
    }
  });

// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "0bd50ec6d1c1d8",
//       pass: "47920f1ffeb570"
//     }
//   });

exports.createAdmin=(req,res)=>{
    const {name,email,password,confirm_pass}=req.body;



    if(password!==confirm_pass){
        console.log("Password Does not match with confirm password");
        return res.status(400).json({
            error:"Password Does not match with confirm password"
        })
        
    }
    Member.findOne({email}).exec((err,user)=>{
        if(err){
            return res.status(401).json({
                error:"something went wrong!."
            })
        }

        if(user){
            return res.status(400).json({
                error:"admin is alredy exist!!."
            })
        }

        const token=jwt.sign(
            {
            name,
            email,
            password
        },
        process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:"7d"
        });

        const emailData={
            to:[
                {
                    address:email,
                    name
                }
            ],
            from:{
                address:process.env.EMAIL_FROM,
                name:"softentures privated lmt."
            },
            subject:"Account activatoin link",
            html:`
                <div>
                    <h1>please use the following link to activate your account.</h1>
                    <a href="${process.env.CLIENT_URL}/society/activateAdmin/${token}" target="_blank">click hear to Activate </a>
                    <hr />
                    <p>this email contains sensitive information</p>
                    <a href="${process.env.CLIENT_URL}" target="_blank">${process.env.CLIENT_URL}</a>
                    </div>
            `
        }

        transport.sendMail(emailData,(err,info)=>{
            if(err){
                return res.status(400).json({
                    error:err,
                })
            }
            res.json({
                message:`email has been sucessfully sent to ${email}. follow the instriction to activate you account.`
            })
        }) 
    });
}

exports.activateAdmin=(req,res)=>{
    const {token}=req.body;

    if(token){
        return jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,(err)=>{
            if(err){
                return res.status(401).json({error:"token link has expored"})
            }
            const {name,email,password}=jwt.decode(token);

            const newMember=new Admin({
                name,
                email,
                password
            })
        
            Admin.findOne({email:req.body.email}).exec((err,member)=>{
                if(err){
                    return res.status(400).json({
                        error:"something went wrong"
                    });
                }

                if(member){
                    return res.status(400).json({
                        error:"the account alredy been activated"
                    })

                }
                newMember.save().then(data=>res.json({message:"registered sucessfully"}));
            })
        })
    }
    return res.status(401).json({error:"your token is invalid"})
};

exports.LogInAdmin=(req,res)=>{
    const {email,password}=req.body;

    Admin.findOne({email}).exec((err,member)=>{
        if(err || !member){
            return res.status(400).json({
                error:"this email Id is not registered"
            })
        }

        if(!member.authenticate(password)){
            return res.status(400).json({
                error:"Password is incorrect"
            })
        }

        const token=jwt.sign({_id:member._id},process.env.JWT_SECRET,{
            expiresIn:'7d',
        })
        const {name,role}=member
        Admin.findOne({_id:member._id}).then(member=>res.json({
            token,
            member,
            message:"signed in sucessfully"
        }))
    })
};



// exports.forgotPassword=(req,res)=>{
//     const {email}=req.body;

//     Society.findOne({email}).exec((error,society)=>{
//         if(error,!society){
//             return res.status(400).json({errir:"no society found with this email"})
//         }
//         const token=jwt.sign({_id:society._id,name:society.name},process.env.JWT_RESET_PASSWORD,{expiresIn:"10m"})
        
//         const emailData={
//             from:process.env.EMAIL_FROM,
//             to:email,
//             subject:"Password reset Link",
//             html:`
//                 <h1>Please use the followin glink to reset password</h1>
//                 <a href="${process.env.CLIENT_URL}/society/password/reset/${token}" target="_blank">click hear to reset password</a>
//             `
//         };

//         return society.updateOne({resetPasswordLink:token}).exec((err,sucess)=>{
//             if(err){
//                 return res.status(400).json({
//                     error:"there was a error in saving reset password link"
//                 });
//             }

//             transport.sendMail(emailData)
//                 .then(()=>{
//                     return res.json({
//                         message:`Email has been sucessfully sent to ${email}`
//                     })

//                 })
//                 .catch((err)=>{
//                     return res.status(400).json({
//                         err:"there was an error in sending the email"
//                     })
//                 })
//         })
//     })
// }

// exports.resetPassword=(req,res)=>{
//     const {resetPasswordLink,newPassword}=req.body;

//     if(resetPasswordLink){
//         return jwt.verify(resetPasswordLink,process.env.JWT_RESET_PASSWORD,(err)=>{
//             if(err){
//                 return res.status(400).json({
//                     error:"Link Has Expired, Try Again."
//                 })
//             }
//             Society.findOne({resetPasswordLink}).exec((err,society)=>{
//                 if(err || !society){
//                     return res.status(400).json({error:"Something went wrong"})
//                 }

//                 const updateFields={
//                     password:newPassword,
//                     resetPasswordLink:'',
//                 }

//                 society=_.extend(society,updateFields);

//                 society.save(err=>{
//                     if(err){return res.status(400).json({
//                         error:"error in reseting password",
//                     })
//                 }
//                 return res.json({
//                     message:"password resetted sucessfully"
//                 })
                    
//                 })


//             })
//         })
//     }
// }










// const jwt=require('jsonwebtoken')
// const Member = require('../models/member');
// const bcrypt=require('bcryptjs');


// exports.createMember=(req,res)=>{

//     const {name,room_no,society,email,password}=req.body;
//     if(!name || ! room_no || !society || !email || !password){
//         res.status(400).json({msg:"please enter all fields"})
//     }
//     Member.findOne({email})
//         .then(member=>{
//             if(member)return res.status(400).json({msg:"member with this email alredy exist"});

//             const newMember=new Member({
//                 name,
//                 room_no,
//                 society,
//                 email,
//                 password
//             })

//             bcrypt.genSalt(10,(err,salt)=>{
//                 bcrypt.hash(newMember.password,salt,(err,hash)=>{
//                     if(err)throw err;
//                     newMember.password=hash;
//                     newMember.save()
//                         .then(member=>{

//                             jwt.sign(
//                                 {id:member.id},
//                                 process.env.JWT_SECRET,
//                                 {expiresIn:3600},
//                                 (err,token)=>{
//                                     if(err) throw err;
//                                     res.json({
//                                         token,
//                                         member:{
//                                         id:member.id,
//                                         name:member.name,
//                                         email:member.email
//                                         }
//                                     })

//                                 } 
//                             )

                                 
//                         }).catch(err=>res.status(400).json(err))
//                 })
//             })
//         })
// }

// exports.loginMember=(req,res)=>{

//     const {email,password}=req.body;
//     if(!email || !password){
//         res.status(400).json({msg:"please enter all fields"})
//     }
//     Member.findOne({email})
//         .then(member=>{
//             if(!member)return res.status(400).json({msg:"user does not exist"});

//             bcrypt.compare(password,member.password)
//                 .then(isMatch=>{
//                     if(!isMatch) return res.status(400).json({msg:'Invalid Password'})
//                 })
//                 jwt.sign(
//                     {id:member.id},
//                     process.env.JWT_SECRET,
//                     {expiresIn:3600},
//                     (err,token)=>{
//                         if(err) throw err;
//                         res.json({
//                         token,
//                         member:{
//                         id:member.id,
//                         name:member.name,
//                         email:member.email
//                             }
//                         })
//                     }) 
//                 })
//             }


// // exports.forgotPassword=(req,res)=>{
// //     const {email}=req.body;

// //     Society.findOne({email}).exec((error,member)=>{
// //         if(error,!society){
// //             return res.status(400).json({errir:"no member found with this email"})
// //         }
// //         const token=jwt.sign({_id:society._id,name:society.name},process.env.JWT_RESET_PASSWORD,{expiresIn:"10m"})
        
// //         const emailData={
// //             from:process.env.EMAIL_FROM,
// //             to:email,
// //             subject:"Password reset Link",
// //             html:`
// //                 <h1>Please use the followin glink to reset password</h1>
// //                 <a href="${process.env.CLIENT_URL}/society/password/reset/${token}" target="_blank">click hear to reset password</a>
// //             `
// //         };

// //         return society.updateOne({resetPasswordLink:token}).exec((err,sucess)=>{
// //             if(err){
// //                 return res.status(400).json({
// //                     error:"there was a error in saving reset password link"
// //                 });
// //             }

// //             transport.sendMail(emailData)
// //                 .then(()=>{
// //                     return res.json({
// //                         message:`Email has been sucessfully sent to ${email}`
// //                     })

// //                 })
// //                 .catch((err)=>{
// //                     return res.status(400).json({
// //                         err:"there was an error in sending the email"
// //                     })
// //                 })
// //         })
// //     })
// // }

// // exports.resetPassword=(req,res)=>{
// //     const {resetPasswordLink,newPassword}=req.body;

// //     if(resetPasswordLink){
// //         return jwt.verify(resetPasswordLink,process.env.JWT_RESET_PASSWORD,(err)=>{
// //             if(err){
// //                 return res.status(400).json({
// //                     error:"Link Has Expired, Try Again."
// //                 })
// //             }
// //             Society.findOne({resetPasswordLink}).exec((err,society)=>{
// //                 if(err || !society){
// //                     return res.status(400).json({error:"Something went wrong"})
// //                 }

// //                 const updateFields={
// //                     password:newPassword,
// //                     resetPasswordLink:'',
// //                 }

// //                 society=_.extend(society,updateFields);

// //                 society.save(err=>{
// //                     if(err){return res.status(400).json({
// //                         error:"error in reseting password",
// //                     })
// //                 }
// //                 return res.json({
// //                     message:"password resetted sucessfully"
// //                 })
                    
// //                 })


// //             })
// //         })
// //     }
// // }