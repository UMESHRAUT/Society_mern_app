const express=require('express');
const Complaint = require('../../../models/complaint');
const auth = require('../../../middlewares/Auth');
const router = express.Router();



router.post('/seeComplaint/:society',auth,(req,res)=>{
    console.log("logging");
    console.log(req.params);
    (req.member.role=="Secratory")?
    Complaint.find({society:req.params.society}).populate("owner").sort({status:-1}).then(ret=>{console.log(ret); ret.length>0?res.json(ret):res.status(400).json({error:"No complaints available every one is Happy. :)"})}):
    Complaint.find({"owner":req.member._id}).populate("owner").sort({status:-1}).then(ret=>ret.length>0?res.json(ret):res.status(404).json({error:"You have not filed any complaint yet!."}))
})

// router.get('/seeComplaint',auth,(req,res)=>{
//     console.log(req.member.role=="Secratory",req.member.role);
//     res.json(req.member.role=="Secratory")?
//     Complaint.find({}).then(complaints=>res.json(complaints)):
//     Complaint.find({belongTo:req.member._id}).sort({status:-1})
//         .then(complaints=>res.json(complaints))
// })

router.post('/makeComplaint',auth,(req,res)=>{
    console.log(req.member._id);
    const newComplaint=new Complaint({
        society:req.body.society,
        owner:req.member._id,
        title:req.body.title,
        description:req.body.description        
    })
    newComplaint.save().then(complaint=>res.json(complaint))
})


// @route  patch/api/members/complaints

router.patch('/EditComplaint/:id',async (req,res)=>{
    // res.send(req.params.id/)
    const id=req.params.id;
    const updates=req.body;
    // res.json({err:"reaching hear"})
    try {
        const status=await Complaint.findByIdAndUpdate(id,updates);
        res.json(status)
    } catch (error) {
        res.status(404).json('something went wrong')
    }
})

router.put('/EditComplaint/:id',async (req,res)=>{
    // res.send(req.params.id)
    const id=req.params.id;
    const updates=req.body;
    console.log("from hear"+updates);
    // res.json({err:"reaching hear"})
    try {
        const status=await Complaint.findByIdAndUpdate(id,updates);
        res.json(status)
    } catch (error) {
        res.status(404).json('something went wrong')
    }
})

module.exports=router;
