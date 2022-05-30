const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateRegion = [
    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 32 })
        .withMessage("Name must be contain maxium 32 characters"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateRegion = [
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
        .isLength({ max: 32 })
        .withMessage("Name must be contain maxium 32 characters"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateRegion, validateUpdateRegion }