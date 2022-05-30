const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateSpecificationValue, validateUpdateSpecificationValue } = require("../validators/carSpecificationValue");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/carSpecificationValue")

/**
 * @swagger
 * /specificationValue:
 *   post:
 *     summary:  Create specification value
 *     tags:
 *       - specificationValue
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/specificationValue"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/specificationValue"
 *       400:
 *         description: bad request
 */
router.post("/specificationValue", authCheck, actionsCheck, validateCreateSpecificationValue, create)

/**
 * @swagger
 * /specificationValue/{id}:
 *   get:
 *     tags:
 *       - specificationValue
 *     summary: "Show data specification value"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Show data specification value active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/specificationValue/:id", authCheck, read)

/**
 * @swagger
 * /specificationValue/{id}:
 *   put:
 *     tags:
 *       - specificationValue
 *     summary: "Updated data specification value"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Updated data specification value"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/specificationValue"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/specificationValue/:id", authCheck, actionsCheck, validateUpdateSpecificationValue, update)

/**
 * @swagger
 * /specificationValue/{id}:
 *   delete:
 *     tags:
 *       - specificationValue
 *     summary: "Deleted data specification value"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Deleted data specification value"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("specificationValue/:id", authCheck, adminCheck, remove)

/**
 * @swagger
 * /specificationValue/{id}:
 *   patch:
 *     tags:
 *       - specificationValue
 *     summary: "Soft deleted data specification value"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Soft deleted data specification value"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/specificationValue/:id", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /specificationValues/total:
 *   get:
 *     tags:
 *       - specificationValue
 *     summary: "Get total number specification values"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/specificationValues/total", authCheck, count)

/**
 * @swagger
 * /specificationValues:
 *   post:
 *     summary:  Show data specification values paginated
 *     tags:
 *       - specificationValue
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/specificationValue"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/specificationValue"
 *       400:
 *         description: bad request
 */
router.post("/specificationValues", authCheck, pagination)

/**
 * @swagger
 * /specificationValues/{count}:
 *   get:
 *     tags:
 *       - specificationValue
 *     summary: "Show list specification values"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list specification values"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/specificationValues/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     specificationValue: 
 *       type: object
 *       required:
 *         - carTrim
 *         - carSpecification
 *         - value
 *         - carType
 *       properties:
 *         carTrim: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/Trim"
 *         carSpecification: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/Specification"
 *         value:
 *           type: string
 *           trim: true
 *           maxlength: 100
 *         unit:
 *           type: string
 *           trim: true
 *           maxlength: 10
 *         carType: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/CarType" 
 *         status: 
 *           type: string
 *           default: "Active"
 *           enum: 
 *           - "Active"
 *           - "Inactive" 
 *       example: 
 *         carTrim: "625de58859f95d0a21d0d71a"
 *         carSpecification: "625de58859f95d0a21d0d71a"
 *         value: 1900
 *         unit: mm
 *         carType: "625de58859f95d0a21d0d71a"
 *         status: Active
 */