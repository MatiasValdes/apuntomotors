const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateComuna = [
    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 32 })
        .withMessage("Name must be contain maxium 32 characters"),

    check("region")
        .not()
        .isEmpty()
        .withMessage("Region is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateComuna = [
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

    check("region")
        .not()
        .isEmpty()
        .withMessage("Region is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateComuna, validateUpdateComuna }