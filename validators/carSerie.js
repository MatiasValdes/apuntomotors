const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateSerie = [
    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 100 })
        .withMessage("Name must be contain maxium 100 characters"),

    check("carGeneration")
        .not()
        .isEmpty()
        .withMessage("Generation is Required"),

    check("carModel")
        .not()
        .isEmpty()
        .withMessage("Model is Required"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateSerie = [
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

    check("carGeneration")
        .not()
        .isEmpty()
        .withMessage("Generation is Required"),

    check("carModel")
        .not()
        .isEmpty()
        .withMessage("Model is Required"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateSerie, validateUpdateSerie }