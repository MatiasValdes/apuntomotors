const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateGeneration, validateUpdateGeneration } = require("../validators/carGeneration");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/carGeneration")

/**
 * @swagger
 * /generation:
 *   post:
 *     summary:  Create generation
 *     tags:
 *       - Generation
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Generation"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Generation"
 *       400:
 *         description: bad request
 */
router.post("/generation", authCheck, actionsCheck, validateCreateGeneration, create)

/**
 * @swagger
 * /generation/{id}:
 *   get:
 *     tags:
 *       - Generation
 *     summary: "Show data generation"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Show data generation active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/generation/:id", authCheck, read)

/**
 * @swagger
 * /generation/{id}:
 *   put:
 *     tags:
 *       - Generation
 *     summary: "Updated data generation"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Updated data generation"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Generation"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/generation/:id", authCheck, actionsCheck, validateUpdateGeneration, update)

/**
 * @swagger
 * /generation/{id}:
 *   delete:
 *     tags:
 *       - Generation
 *     summary: "Deleted data generation"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Deleted data generation"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("generation/:id", authCheck, adminCheck, remove)

/**
 * @swagger
 * /generation/{id}:
 *   patch:
 *     tags:
 *       - Generation
 *     summary: "Soft deleted data generation"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Soft deleted data generation"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/generation/:id", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /generations/total:
 *   get:
 *     tags:
 *       - Generation
 *     summary: "Get total number generations"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/generations/total", authCheck, count)

/**
 * @swagger
 * /generations:
 *   post:
 *     summary:  Show data generation paginated
 *     tags:
 *       - Generation
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Generation"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Generation"
 *       400:
 *         description: bad request
 */
router.post("/generations", authCheck, pagination)

/**
 * @swagger
 * /generations/{count}:
 *   get:
 *     tags:
 *       - Generation
 *     summary: "Show list generations"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list generations"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/generations/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Generation:
 *       type: object
 *       required:
 *         - carModel
 *         - name
 *         - cartype
 *       properties:
 *         carModel: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/CarModel"
 *         name:
 *           type: string
 *           trim: true
 *           maxlength: 200
 *         yearBegin:
 *           type: Date
 *         yearEnd:
 *           type: Date
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
 *         carModel: "625de58859f95d0a21d0d71a"
 *         name: 1 generation
 *         yearBegin: 2012
 *         yearEnd: 2016
 *         cartype: "625de58859f95d0a21d0d71a"
 *         status: Active
 */