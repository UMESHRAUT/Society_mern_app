const express=require('express');
const router = express.Router();


const Member = require('../../../models/member');
const { createMember, activateMember, LogInMember} = require('../../../controllers/member');


const { runValidation } = require('../../../validaters/index');
const { memberRegistrartionValidator } = require('../../../validaters/member');
const auth = require('../../../middlewares/Auth');


// MEMBER ACOUNT REGISTER/LOGIN

router.post('/members',auth,(req,res)=>{
    console.log(req.body.member_of);
    Member.find({member_of:req.body.member_of})
        .then(memberList=>res.json(memberList))
})

router.post('/register',memberRegistrartionValidator,runValidation,createMember)
router.post('/activateMember',activateMember)
router.post('/login',LogInMember)


module.exports = router;