const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateModel = [
    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 32 })
        .withMessage("Name must be contain maxium 32 characters"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    check("carMake")
        .not()
        .isEmpty()
        .withMessage("Make is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateModel = [
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

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    check("carMake")
        .not()
        .isEmpty()
        .withMessage("Make is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateModel, validateUpdateModel }