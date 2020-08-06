const express=require('express');
const Admin = require('../../../models/admin');
const { createAdmin, activateAdmin, LogInAdmin } = require('../../../controllers/admin');
const Society = require('../../../models/society');
const { societyRegistrartionValidator } = require('../../../validaters/society');
const { runValidation } = require('../../../validaters');
const auth = require('../../../middlewares/Auth');
const router=express.Router();

router.post('/createAdmin',createAdmin)
router.post('/activateAdmin',activateAdmin)
router.post('/adminLogin',LogInAdmin)

router.get('/seeSociety',(req,res)=>{
    Society.find({})
        .sort({reg_no:1})
        .then(societies=>res.json(societies))
})

router.get('/SocietyDetails/:id',(req,res)=>{
    Society.findOne({_id:req.params.id}).populate("members").then(data=>res.send(data))
})
 
router.delete('/DeleteSociety/:id',(req,res)=>{
    Society.findOneAndDelete({_id:req.params.id}).then(data=>res.json({msg:`Society Deleted`}))
})

router.get('/getAllSociety',(req,res)=>{
    Society.find({})
        .sort({reg_no:-1})
        .then(societies=>res.json(societies))
})

router.post('/registerSociety',societyRegistrartionValidator,runValidation,(req,res)=>{
    const newComplaint=new Society({
        name:req.body.name,
        address:req.body.address,
        reg_no:req.body.reg_no       
    })
    newComplaint.save().then(complaint=>res.json({msg:"society registered sucessfully"})).catch(err=>res.status(400).json(err))
})

module.exports=router;