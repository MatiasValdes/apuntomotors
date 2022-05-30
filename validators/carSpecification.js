const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateSpecification = [
    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 100 })
        .withMessage("Name must be contain maxium 100 characters"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateSpecification = [
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

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateSpecification, validateUpdateSpecification }