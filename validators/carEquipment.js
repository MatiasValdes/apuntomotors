const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateEquipment = [
    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 300 })
        .withMessage("Name must be contain maxium 300 characters"),

    check("year")
        .isNumeric()
        .withMessage("Year should be number")
        .not()
        .isEmpty()
        .withMessage("Year is Required")
        .isLength({ min: 4, max: 4 })
        .withMessage("Title must be contain 4 characters"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    check("carTrim")
        .not()
        .isEmpty()
        .withMessage("Trim is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateEquipment = [
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
        .isLength({ max: 300 })
        .withMessage("Name must be contain maxium 300 characters"),

    check("year")
        .isNumeric()
        .withMessage("Year should be number")
        .not()
        .isEmpty()
        .withMessage("Year is Required")
        .isLength({ min: 4, max: 4 })
        .withMessage("Year must be contain 4 characters"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    check("carTrim")
        .not()
        .isEmpty()
        .withMessage("Trim is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateEquipment, validateUpdateEquipment }