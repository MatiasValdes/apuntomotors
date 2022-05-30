const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateService = [
    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 50 })
        .withMessage("Name must be contain maxium 50 characters"),

    check("description")
        .exists()
        .isString()
        .withMessage("Description should be text")
        .not()
        .isEmpty()
        .withMessage("Description is Required")
        .isLength({ max: 2000 })
        .withMessage("Description must be contain maxium 2000 characters"),

    check("price")
        .exists()
        .isNumeric()
        .withMessage("Price should be number")
        .not()
        .isEmpty()
        .withMessage("Price is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateService = [
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
        .isLength({ max: 50 })
        .withMessage("Name must be contain maxium 50 characters"),

    check("description")
        .exists()
        .isString()
        .withMessage("Description should be text")
        .not()
        .isEmpty()
        .withMessage("Description is Required")
        .isLength({ max: 2000 })
        .withMessage("Description must be contain maxium 2000 characters"),

    check("price")
        .exists()
        .isNumeric()
        .withMessage("Price should be number")
        .not()
        .isEmpty()
        .withMessage("Price is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateService, validateUpdateService }