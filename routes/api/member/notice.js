const express=require('express');
const auth = require('../../../middlewares/Auth');
const Notice = require('../../../models/notice');
const { noticeValidator } = require('../../../validaters/notice');
const { runValidation } = require('../../../validaters');
const Society = require('../../../models/society');
const Message = require('../../../models/message');
const router=express.Router();


router.post('/getNotice',async (req,res)=>{
    console.log(req.body.Society);
    Notice.find({Society:req.body.Society}).sort({"createdAt":-1})
    .then(data=>data.length>0?res.json(data[0]):res.status(404).json({error:"No Notice found"}))
    })

router.post('/postNotice',noticeValidator,runValidation,(req,res)=>{
    const newNotice=new Notice({
        Society:req.body.Society,
        subject:req.body.subject,
        about:req.body.about
    })
        newNotice.save()
        .then(()=>res.json({newNotice}))
        // await society.save()
        // .then(()=>newNotice.save().then(notice=>res.send(notice))) })
    
})
router.delete('/deleteNotice/:id',async (req,res)=>{
    const id=req.params.id;
    try{
        const notice=await Notice.findByIdAndRemove(id);
        res.send(notice)
    }catch(error){
        res.status(404).json("something went wrong")
    }
})

router.put('/EditNotice/:id',async (req,res)=>{
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
        Notice:req.body.Notice,
        owner:req.body.owner,
        msg:req.body.msg
    })
    newMsg.save().then(()=>res.send("saved in message")).catch(err=>console.log(err))
})

router.post('/messagesOfNotice/:noticeId',(req,res)=>{
    // res.send("reaching")
    Message.find({Notice:req.params.noticeId}).populate("owner").then(msg=>{console.log(msg);res.send(msg);});
})

module.exports=router;  