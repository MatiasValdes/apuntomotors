const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateOptionValue, validateUpdateOptionValue } = require("../validators/carOptionValue");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/carOptionValue")

/**
 * @swagger
 * /optionValue:
 *   post:
 *     summary:  Create option value
 *     tags:
 *       - optionValue
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/optionValue"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/optionValue"
 *       400:
 *         description: bad request
 */
router.post("/optionValue", authCheck, actionsCheck, validateCreateOptionValue, create)

/**
 * @swagger
 * /optionValue/{id}:
 *   get:
 *     tags:
 *       - optionValue
 *     summary: "Show data option value"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Show data option value active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/optionValue/:id", authCheck, read)

/**
 * @swagger
 * /optionValue/{id}:
 *   put:
 *     tags:
 *       - optionValue
 *     summary: "Updated data option value"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Updated data option value"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/optionValue"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/optionValue/:id", authCheck, actionsCheck, validateUpdateOptionValue, update)

/**
 * @swagger
 * /optionValue/{id}:
 *   delete:
 *     tags:
 *       - optionValue
 *     summary: "Deleted data option value"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Deleted data option value"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("optionValue/:id", authCheck, adminCheck, remove)

/**
 * @swagger
 * /optionValue/{id}:
 *   patch:
 *     tags:
 *       - optionValue
 *     summary: "Soft deleted data option value"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Soft deleted data option value"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/optionValue/:id", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /optionValues/total:
 *   get:
 *     tags:
 *       - optionValue
 *     summary: "Get total number option values"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/optionValues/total", authCheck, count)

/**
 * @swagger
 * /optionValues:
 *   post:
 *     summary:  Show data option values paginated
 *     tags:
 *       - optionValue
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/optionValue"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/optionValue"
 *       400:
 *         description: bad request
 */
router.post("/optionValues", authCheck, pagination)

/**
 * @swagger
 * /optionValues/{count}:
 *   get:
 *     tags:
 *       - optionValue
 *     summary: "Show list option values"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list option values"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/optionValues/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     optionValue: 
 *       type: object
 *       required:
 *         - carOption
 *         - carEquipment
 *         - carType
 *       properties:
 *         carOption:
 *           type: ObjectId
 *           $ref: "#/components/schemas/Option"
 *         carEquipment:
 *           type: ObjectId
 *           $ref: "#/components/schemas/Equipment"
 *         isBase:
 *           type: Number
 *           default: 1
 *         cartype:
 *           type: ObjectId
 *           $ref: "#/components/schemas/CarType" 
 *         status: 
 *           type: string
 *           default: "Active"
 *           enum: 
 *           - "Active"
 *           - "Inactive" 
 *       example: 
 *         carOption: Honda
 *         carEquipment: honda
 *         isBase : 1
 *         cartype: "625de58859f95d0a21d0d71a"
 *         status: Active
 */