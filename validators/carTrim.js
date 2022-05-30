const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateTrim = [
    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 50 })
        .withMessage("Name must be contain maxium 50 characters"),

    check("starProductionYear")
        .exists()
        .isNumeric()
        .withMessage("Star Production Year should be number")
        .isLength({ min: 4, max: 4 })
        .withMessage("Star Production Year must be contain 4 characters"),

    check("endProductionYear")
        .exists()
        .isNumeric()
        .withMessage("End Production Year should be number")
        .isLength({ min: 4, max: 4 })
        .withMessage("End Production Year must be contain 4 characters"),

    check("carSerie")
        .not()
        .isEmpty()
        .withMessage("Serie is Required"),

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

const validateUpdateTrim = [
    param("id")
        .isLowercase()
        .withMessage("Id should be pass in lowercase"),

    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 50 })
        .withMessage("Name must be contain maxium 50 characters"),

    check("starProductionYear")
        .exists()
        .isNumeric()
        .withMessage("Star Production Year should be number")
        .isLength({ min: 4, max: 4 })
        .withMessage("Star Production Year must be contain 4 characters"),

    check("endProductionYear")
        .exists()
        .isNumeric()
        .withMessage("End Production Year should be number")
        .isLength({ min: 4, max: 4 })
        .withMessage("End Production Year must be contain 4 characters"),

    check("carSerie")
        .not()
        .isEmpty()
        .withMessage("Serie is Required"),

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

module.exports = { validateCreateTrim, validateUpdateTrim }