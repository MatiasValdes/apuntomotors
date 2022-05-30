const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateCar = [
    check("patent")
        .exists()
        .isAlphanumeric()
        .withMessage("Patent should be alphanumeric")
        .not()
        .isEmpty()
        .withMessage("Patent is Required")
        .isLength({ min: 6 })
        .withMessage("Title must be contain minimum 6 characters")
        .isLength({ max: 6 })
        .withMessage("Title must be contain maxium 6 characters"),

    check("comment")
        .not()
        .isEmpty()
        .withMessage("Comment is Required")
        .isLength({ max: 2000 })
        .withMessage("Title must be contain maxium 2000 characters"),

    check("client")
        .not()
        .isEmpty()
        .withMessage("Cliente is Required"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    check("carTrim")
        .not()
        .isEmpty()
        .withMessage("Trim is Required"),

    check("carSerie")
        .not()
        .isEmpty()
        .withMessage("Serie is Required"),

    check("carModel")
        .not()
        .isEmpty()
        .withMessage("Model is Required"),

    check("carMake")
        .not()
        .isEmpty()
        .withMessage("Make is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateCar = [
    param("slug")
        .isLowercase()
        .withMessage("Slug should be pass in lowercase"),

    check("patent")
        .exists()
        .isAlphanumeric()
        .withMessage("Patent should be alphanumeric")
        .not()
        .isEmpty()
        .withMessage("Patent is Required")
        .isLength({ min: 6 })
        .withMessage("Title must be contain minimum 6 characters")
        .isLength({ max: 6 })
        .withMessage("Title must be contain maxium 6 characters"),

    check("comment")
        .not()
        .isEmpty()
        .withMessage("Comment is Required")
        .isLength({ max: 2000 })
        .withMessage("Title must be contain maxium 2000 characters"),

    check("client")
        .not()
        .isEmpty()
        .withMessage("Cliente is Required"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Cliente is Required"),

    check("carTrim")
        .not()
        .isEmpty()
        .withMessage("Cliente is Required"),

    check("carSerie")
        .not()
        .isEmpty()
        .withMessage("Cliente is Required"),

    check("carModel")
        .not()
        .isEmpty()
        .withMessage("Cliente is Required"),

    check("carMake")
        .not()
        .isEmpty()
        .withMessage("Cliente is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateCar, validateUpdateCar }