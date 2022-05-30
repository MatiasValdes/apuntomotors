const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateSpecificationValue = [
    check("value")
        .exists()
        .isString()
        .withMessage("Value should be text")
        .not()
        .isEmpty()
        .withMessage("Value is Required")
        .isLength({ max: 100 })
        .withMessage("Value must be contain maxium 100 characters"),

    check("unit")
        .exists()
        .isString()
        .withMessage("unit should be text")
        .isLength({ max: 10 })
        .withMessage("Unit must be maxium 10 characters"),
        
    check("carTrim")
        .not()
        .isEmpty()
        .withMessage("Trim is Required"),

    check("carSpecification")
        .not()
        .isEmpty()
        .withMessage("Specification is Required"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateSpecificationValue = [
    param("id")
        .isLowercase()
        .withMessage("Id should be pass in lowercase"),

    check("value")
        .exists()
        .isString()
        .withMessage("Value should be text")
        .not()
        .isEmpty()
        .withMessage("Value is Required")
        .isLength({ max: 100 })
        .withMessage("Value must be contain maxium 100 characters"),

    check("unit")
        .exists()
        .isString()
        .withMessage("unit should be text")
        .isLength({ max: 10 })
        .withMessage("Unit must be maxium 10 characters"),

    check("carTrim")
        .not()
        .isEmpty()
        .withMessage("Trim is Required"),

    check("carSpecification")
        .not()
        .isEmpty()
        .withMessage("Specification is Required"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateSpecificationValue, validateUpdateSpecificationValue }