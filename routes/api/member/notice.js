const express=require('express');
const auth = require('../../../middlewares/Auth');
const Notice = require('../../../models/notice');
const { noticeValidator } = require('../../../validaters/notice');
const { runValidation } = require('../../../validaters');
const Society = require('../../../models/society');
const Message = require('../../../models/message');
const router=express.Router();


router.get('/:societyId',async (req,res)=>{
    console.log("ID "+req.params.societyId);
    Notice.find({ofSociety:req.params.societyId}).sort({"createdAt":-1})
    .then(data=>res.json(data[0]))
    })

router.post('/',noticeValidator,runValidation,(req,res)=>{
    const newNotice=new Notice({
        ofSociety:req.body.ofSociety,
        subject:req.body.subject,
        about:req.body.about
    })
    Society.findOne({_id:newNotice.ofSociety})
    .then(society=>{society.notice.push(newNotice._id);society.save()
        .then(()=>newNotice.save()
        .then(()=>res.json({newNotice})))})
        // await society.save()
        // .then(()=>newNotice.save().then(notice=>res.send(notice))) })
    
})
router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    const updates=req.body;
    try{
        const notice=await Notice.findByIdAndRemove(id);
        res.send(notice)
    }catch(error){
        res.status(404).json("something went wrong")
    }
})

router.put('/:id',async (req,res)=>{
    const id=req.params.id;
    const updates=req.body;
    try{
        const notice=await Notice.findByIdAndUpdate(id,updates);
        res.send(notice)
    }catch(error){
        res.status(404).json("something went wrong")
    }
})

router.post('/message',(req,res)=>{
    const newMsg=new Message({
        belongTo:req.body.belongTo,
        owner:req.body.owner,
        msg:req.body.msg
    })

    Notice.findOne({_id:req.body.belongTo})
    .then(notice=>{notice.messages.push(newMsg._id);notice.save().then(()=>newMsg.save().then(()=>res.send(newMsg)))})


})

router.get('/messagesOfNotice/:noticeId',(req,res)=>{
    Notice.findOne({_id:req.params.noticeId},{message:1}).populate("messages").then(msgs=>res.send(msgs.messages))
})

module.exports=router;