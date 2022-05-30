const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateUser = [
    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 100 })
        .withMessage("Name must be contain maxium 100 characters"),

    check("email")
        .exists()
        .isEmail()
        .withMessage("Email should be email")
        .not()
        .isEmpty()
        .withMessage("Email is Required")
        .isLength({ max: 100 })
        .withMessage("Email must be contain maxium 100 characters"),

    check("phone")
        .exists()
        .isMobilePhone()
        .withMessage("Phone should be numeric")
        .not()
        .isEmpty()
        .withMessage("Phone is Required"),

    check("address")
        .exists()
        .isEmail()
        .withMessage("Address should be text")
        .not()
        .isEmpty()
        .withMessage("Address is Required")
        .isLength({ max: 100 })
        .withMessage("Address must be contain maxium 100 characters"),

    check("role")
        .not()
        .isEmpty()
        .withMessage("Role is Required"),

    check("comuna")
        .not()
        .isEmpty()
        .withMessage("Comuna is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateUser = [
    param("slug")
        .isLowercase()
        .withMessage("Slug should be pass in lowercase"),

    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 100 })
        .withMessage("Name must be contain maxium 100 characters"),

    check("email")
        .exists()
        .isEmail()
        .withMessage("Email should be email")
        .not()
        .isEmpty()
        .withMessage("Email is Required")
        .isLength({ max: 100 })
        .withMessage("Email must be contain maxium 100 characters"),

    check("phone")
        .exists()
        .isMobilePhone()
        .withMessage("Phone should be numeric")
        .not()
        .isEmpty()
        .withMessage("Phone is Required"),

    check("address")
        .exists()
        .isEmail()
        .withMessage("Address should be text")
        .not()
        .isEmpty()
        .withMessage("Address is Required")
        .isLength({ max: 100 })
        .withMessage("Address must be contain maxium 100 characters"),

    check("role")
        .not()
        .isEmpty()
        .withMessage("Role is Required"),

    check("comuna")
        .not()
        .isEmpty()
        .withMessage("Comuna is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateUser, validateUpdateUser }