const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateOptionValue = [
    check("carOption")
        .not()
        .isEmpty()
        .withMessage("Option is Required"),

    check("carEquipment")
        .not()
        .isEmpty()
        .withMessage("Equipment is Required"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateOptionValue = [
    param("id")
        .isLowercase()
        .withMessage("id should be pass in lowercase"),

    check("carOption")
        .not()
        .isEmpty()
        .withMessage("Option is Required"),

    check("carEquipment")
        .not()
        .isEmpty()
        .withMessage("Equipment is Required"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateOptionValue, validateUpdateOptionValue }