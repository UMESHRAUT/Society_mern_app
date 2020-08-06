const { check } = require('express-validator')

exports.societyRegistrartionValidator = [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("address").not().isEmpty().withMessage("please enter address"),
    check("reg_no").not().isEmpty().withMessage("Registration no is required")
]
