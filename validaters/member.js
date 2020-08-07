const { check } = require('express-validator')

exports.memberRegistrartionValidator = [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("society").not().isEmpty().withMessage("Society in which you live is required"),
    check("room_no").not().isEmpty().withMessage("Room no is required"),
    check("email").isEmail().withMessage("Must be a valid Email"),
    check("password").not().isEmpty().isLength({min:6}).withMessage("password must be 6 characters long"),
]
