const { check } = require('express-validator')

exports.noticeValidator = [
    check("subject").not().isEmpty().withMessage("subject is required"),
    check("about").not().isEmpty().isLength({min:20}).withMessage("discription must be 20 characters long"),
]
