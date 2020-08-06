// const nodemailer=require('nodemailer')
// const Society=require('../models/society')
// const jwt=require('jsonwebtoken')
// const _ =require('lodash');

// const transport = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: "rautumesh300@gmail.com",
//       pass: "Umesh@123"
//     }
//   });

// exports.signUp=(req,res)=>{
//     const {name,email,address,registration_no,password}=req.body;

//     Society.findOne({email}).exec((err,user)=>{
//         if(err){
//             return res.status(401).json({
//                 error:"something went wrong!."
//             })
//         }

//         if(user){
//             return res.status(400).json({
//                 error:"your society alredy exist!!."
//             })
//         }

//         const token=jwt.sign(
//             {
//             name,
//             email,
//             registration_no,
//             password,address
//         },
//         process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:"20m"
//         });

//         const emailData={
//             to:[
//                 {
//                     address:email,
//                     name
//                 }
//             ],
//             from:{
//                 address:process.env.EMAIL_FROM,
//                 name:"softentures privated lmt."
//             },
//             subject:"Account activatoin link",
//             html:`
//                 <div>
//                     <h1>please use the following link to activate your account.</h1>
//                     <a href="${process.env.CLIENT_URL}/society/activate/${token}" target="_blank">click hear to Activate </a>
//                     <hr />
//                     <p>this email contains sensitive information</p>
//                     <a href="${process.env.CLIENT_URL}" target="_blank>${process.env.CLIENT_URL}</a>
//                     </div>
//             `
//         }

//         transport.sendMail(emailData,(err,info)=>{
//             if(err){
//                 return res.status(400).json({
//                     error:err,
//                 })
//             }
//             res.json({
//                 message:`email has benn sucessfully sent to ${email}. follow the instriction to activate you account.`
//             })
//         }) 
//     });
// }

// exports.activateAcount=(req,res)=>{
//     const {token}=req.body;

//     if(token){
//         return jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,(err)=>{
//             if(err){
//                 return res.status(401).json({error:"token link has expored"})
//             }
//             const {name,email,registration_no,address,password}=jwt.decode(token);

//             const newSociety=new Society({
//                 name,
//                 email,
//                 address,
//                 registration_no,
//                 password
//             })
        
//             Society.findOne({email:req.body.email}).exec((err,society)=>{
//                 if(err){
//                     return res.status(400).json({
//                         error:"something went wrong"
//                     });
//                 }

//                 if(society){
//                     return res.status(400).json({
//                         error:"the account alredy been activated"
//                     })

//                 }

//                 newSociety.save().then(data=>res.json(data));
//             })
//         })
//     }
//     return res.status(401).json({err:"your token is invalid"})
// };

// exports.signIn=(req,res)=>{
//     const {email,password}=req.body;

//     Society.findOne({email}).exec((err,society)=>{
//         if(err || !society){
//             return res.status(400).json({
//                 error:"society with this email Id is not registered"
//             })
//         }

//         if(!society.authontication(password)){
//             return res.status(400).json({
//                 error:"Password is incorrect"
//             })
//         }

//         const token=jwt.sign({_id:society._id},process.env.JWT_SECRET,{
//             expiresIn:'7d',
//         })

//         const {_id,name,email,address,registration_no}=society;

//         return res.json({
//             token,
//             society:{
//                 _id,
//                 name,
//                 email,
//                 address,
//                 registration_no
//             },
//             message:"signed in sucessfully"
//         })
//     })
// };

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