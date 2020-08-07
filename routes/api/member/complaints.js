const express=require('express');
const Complaint = require('../../../models/complaint');
const auth = require('../../../middlewares/Auth');
const router = express.Router();



router.post('/seeComplaint',auth,(req,res)=>{
    (req.member.role=="Secratory")?
    Complaint.find({}).sort({status:-1}).then(ret=>res.json(ret)):
    Complaint.find({society:req.body.society}).sort({status:-1}).then(ret=>res.json(ret))
})

// router.get('/seeComplaint',auth,(req,res)=>{
//     console.log(req.member.role=="Secratory",req.member.role);
//     res.json(req.member.role=="Secratory")?
//     Complaint.find({}).then(complaints=>res.json(complaints)):
//     Complaint.find({belongTo:req.member._id}).sort({status:-1})
//         .then(complaints=>res.json(complaints))
// })

router.post('/makeComplaint',auth,(req,res)=>{
    const newComplaint=new Complaint({
        belongTo:req.member._id,
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
    // res.json({err:"reaching hear"})
    try {
        const status=await Complaint.findByIdAndUpdate(id,updates);
        res.json(status)
    } catch (error) {
        res.status(404).json('something went wrong')
    }
})

module.exports=router;
