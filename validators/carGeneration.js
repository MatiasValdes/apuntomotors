const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateGeneration = [
    check("name")
        .exists()
        .isString()
        .withMessage("Title should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 200 })
        .withMessage("Title must be contain maxium 200 characters"),

    check("yearBegin")
        .exists()
        .isNumeric()
        .withMessage("Year Begin should be number")
        .isLength({ min: 4, max: 4 })
        .withMessage("Title must be contain 4 characters"),

    check("yearEnd")
        .exists()
        .isNumeric()
        .withMessage("Year End should be number")
        .isLength({ min: 4, max: 4 })
        .withMessage("Title must be contain 4 characters"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    check("carModel")
        .not()
        .isEmpty()
        .withMessage("Model is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateGeneration = [
    param("slug")
        .isLowercase()
        .withMessage("Slug should be pass in lowercase"),

    check("name")
        .exists()
        .isString()
        .withMessage("Title should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 200 })
        .withMessage("Title must be contain maxium 200 characters"),

    check("yearBegin")
        .exists()
        .isNumeric()
        .withMessage("Year Begin should be number")
        .isLength({ min: 4, max: 4 })
        .withMessage("Title must be contain 4 characters"),

    check("yearEnd")
        .exists()
        .isNumeric()
        .withMessage("Year End should be number")
        .isLength({ min: 4, max: 4 })
        .withMessage("Title must be contain 4 characters"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    check("carModel")
        .not()
        .isEmpty()
        .withMessage("Model is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },

]

module.exports = { validateCreateGeneration, validateUpdateGeneration }