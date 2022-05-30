const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateOption = [
    check("name")
        .exists()
        .isString()
        .withMessage("Name should be text")
        .not()
        .isEmpty()
        .withMessage("Name is Required")
        .isLength({ max: 32 })
        .withMessage("Name must be contain maxium 32 characters"),

    check("parent")
        .not()
        .isEmpty()
        .withMessage("Parent is Required"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateOption = [
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
        .isLength({ max: 32 })
        .withMessage("Title must be contain maxium 32 characters"),

    check("parent")
        .not()
        .isEmpty()
        .withMessage("Parent is Required"),

    check("carType")
        .not()
        .isEmpty()
        .withMessage("Type is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateOption, validateUpdateOption }