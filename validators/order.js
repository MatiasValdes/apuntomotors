const { check, param } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateOrder = [
    check("car")
        .not()
        .isEmpty()
        .withMessage("Car by is Required"),

    check("dateInit")
        .exists()
        .isDate()
        .withMessage("Date Init should be date")
        .not()
        .isEmpty()
        .withMessage("Date Init is Required"),

    check("dateEnd")
        .exists()
        .isDate()
        .withMessage("Date End should be date")
        .not()
        .isEmpty()
        .withMessage("Date End is Required"),

    check("comments")
        .exists()
        .isString()
        .withMessage("Comments should be text")
        .not()
        .isEmpty()
        .isLength({ max: 2000 })
        .withMessage("Comments must be contain maxium 2000 characters"),

    check("assignedFor")
        .not()
        .isEmpty()
        .withMessage("Assigned For is Required"),

    check("service")
        .not()
        .isEmpty()
        .withMessage("Service is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

const validateUpdateOrder = [
    param("id")
        .isLowercase()
        .withMessage("Id should be pass in lowercase"),

    check("car")
        .not()
        .isEmpty()
        .withMessage("Car by is Required"),

    check("dateInit")
        .exists()
        .isDate()
        .withMessage("Date Init should be date")
        .not()
        .isEmpty()
        .withMessage("Date Init is Required"),

    check("dateEnd")
        .exists()
        .isDate()
        .withMessage("Date End should be date")
        .not()
        .isEmpty()
        .withMessage("Date End is Required"),

    check("comments")
        .exists()
        .isString()
        .withMessage("Comments should be text")
        .not()
        .isEmpty()
        .isLength({ max: 2000 })
        .withMessage("Comments must be contain maxium 2000 characters"),

    check("assignedFor")
        .not()
        .isEmpty()
        .withMessage("Assigned For is Required"),

    check("service")
        .not()
        .isEmpty()
        .withMessage("Service is Required"),

    (req, res, next) => {
        validateResult(req, res, next)
    },
]

module.exports = { validateCreateOrder, validateUpdateOrder }