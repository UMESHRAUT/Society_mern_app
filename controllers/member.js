const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')
require('dotenv').config();
const _ =require('lodash');
const Member = require('../models/member');
const Society = require('../models/society');

// var transport = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: "rautumesh300@gmail.com",
//       pass: process.env.mailPassword
//     }
//   });

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0bd50ec6d1c1d8",
      pass: "47920f1ffeb570"
    }
  });

exports.createMember=(req,res)=>{
    const {name,society,room_no,role,email,password,confirm_pass}=req.body;



    if(password!==confirm_pass){
        console.log("Password Does not match with confirm password");
        return res.status(400).json({
            error:"Password Does not match with confirm password"
        })
        
    }

    Member.find({$or:[{email},{room_no}]}).exec((err,users)=>{
        if(err){
            return res.status(500).json({
                error:"something went wrong!."
            })
        }

        users.map(user=>{
            if(user.society==society && user.room_no==room_no){
                console.log("Member with this room No. is already exist in");
                return res.status(400).json({
                    error:`Member with this room no. is already exist`
                }) 
            }

        if(user.email==email){
            console.log(user.room_no);
            console.log(password+""+confirm_pass);
            return res.status(400).json({
                error:"Member with this Email is already exist!!"
            })}
        })
        //     if(user.society==society && user.room_no==room_no){
        //         console.log("Member with this room No. is already exist");
        //         return res.status(400).json({
        //             error:"Member with this room no already exist"
        //         }) 
        //     }

        // if(user.email==email){
        //     console.log(user.room_no);
        //     console.log(password+""+confirm_pass);
        //     return res.status(400).json({
        //         error:"Member with this Email is already exist!!"
        //     })
        // }


        const token=jwt.sign(
            {
            name,
            society,
            room_no,
            role,
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
                name:"Newton School Projects."
            },
            subject:"Account activatoin link",
            html:`
                <div>
                    <h1>please use the following link to activate your account.</h1>
                    <a href="https://lit-headland-48684.herokuapp.com/society/activate/${token}" target="_blank">click hear to Activate </a>
                    <hr />
                    <p>this email contains sensitive information</p>
                    <a href="https://lit-headland-48684.herokuapp.com/" target="_blank">Society.com</a>
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
                message:`Email has been sucessfully sent to ${email}. Follow the instriction to activate you account.`,
                link:`https://lit-headland-48684.herokuapp.com/society/activate/${token}`
            })
        }) 
    });
}

exports.activateMember=async (req,res)=>{
    const {token}=req.body;
    console.log(token);

    if(token){
        return jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,(err)=>{
            if(err){
                return res.status(401).json({error:"token link has expored"})
            }
            const {name,society,room_no,role,email,password}=jwt.decode(token);

            const newMember=new Member({
                name,
                society,
                room_no,
                role,
                email,
                password
            })
        
            Member.findOne({email:newMember.email}).exec(async(err,member)=>{
                if(err){
                    return res.status(400).json({
                        error:"Something went wrong"
                    });
                }

                else if(member){
                    console.log("The account alredy been activated");
                    return res.status(400).json({
                        error:"This account is already activated"
                    })

                }
                else{
                newMember.save().then(()=>res.json({message:"registered sucessfully"}))
                }
            })
        })
    }
    return res.status(401).json({error:"your token is invalid"})
};

exports.LogInMember=async (req,res)=>{
    const {email,password}=req.body;

    Member.findOne({email}).exec((err,member)=>{
        if(err || !member){
            return res.status(400).json({
                error:"This email Id is not registered"
            })
        }

        if(!member.authenticate(password)){
            return res.status(400).json({
                error:"Password is incorrect"
            })
        }

        const token=jwt.sign({_id:member._id,role:member.role},process.env.JWT_SECRET,{
            expiresIn:'7d',
        })
        const {society,name,room_no,role}=member
        const data=Society.findOne({_id:society},{name}).then(data=>res.json({
            token,
            member:{
                id:member._id,
                name,
                society:data,
                room_no,
                role,
            },
            message:"log in sucessfully"
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