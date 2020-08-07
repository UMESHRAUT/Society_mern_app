const express=require('express');
const router = express.Router();


const Member = require('../../../models/member');
const { createMember, activateMember, LogInMember} = require('../../../controllers/member');


const { runValidation } = require('../../../validaters/index');
const { memberRegistrartionValidator } = require('../../../validaters/member');
const auth = require('../../../middlewares/Auth');


// MEMBER ACOUNT REGISTER/LOGIN

router.post('/members',auth,(req,res)=>{
    console.log(req.body.society);
    Member.find({society:req.body.society})
        .then(memberList=>res.json(memberList))
})

router.put('/changeRole/:id',async (req,res)=>{
    // res.send(req.params.id/)
    const id=req.params.id;
    const updates=req.body;
    console.log(updates);
    // res.json({err:"reaching hear"})
    try {
        const status=await Member.findByIdAndUpdate(id,updates);
        res.json(status)
    } catch (error) {
        res.status(404).json('something went wrong')
    }
})


router.post('/register',memberRegistrartionValidator,runValidation,createMember)
router.post('/activateMember',activateMember)
router.post('/login',LogInMember)


module.exports = router;