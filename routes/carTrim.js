const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateTrim, validateUpdateTrim } = require("../validators/carTrim");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/carTrim")

/**
 * @swagger
 * /trim:
 *   post:
 *     summary:  Create trim
 *     tags:
 *      - Trim
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Trim"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Trim"
 *       400:
 *         description: bad request
 */
router.post("/trim", authCheck, actionsCheck, validateCreateTrim, create)

/**
 * @swagger
 * /trim/{id}:
 *   get:
 *     tags:
 *      - Trim
 *     summary: "Show data trim"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Show data trim active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/trim/:id", authCheck, read)

/**
 * @swagger
 * /trim/{id}:
 *   put:
 *     tags:
 *      - Trim
 *     summary: "Updated data trim"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Updated data trim"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Trim"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/trim/:id", authCheck, actionsCheck, validateUpdateTrim, update)

/**
 * @swagger
 * /trim/{id}:
 *   delete:
 *     tags:
 *      - Trim
 *     summary: "Deleted data trim"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Deleted data trim"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("trim/:id", authCheck, adminCheck, remove)

/**
 * @swagger
 * /trim/{id}:
 *   patch:
 *     tags:
 *      - Trim
 *     summary: "Soft deleted data trim"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Soft deleted data trim"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/trim/:id", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /trims/total:
 *   get:
 *     tags:
 *      - Trim
 *     summary: "Get total number trims"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/trims/total", authCheck, count)

/**
 * @swagger
 * /trims:
 *   post:
 *     summary:  Show data trims paginated
 *     tags:
 *      - Trim
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Trim"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Trim"
 *       400:
 *         description: bad request
 */
router.post("/trims", authCheck, pagination)

/**
 * @swagger
 * /trims/{count}:
 *   get:
 *     tags:
 *      - Trim
 *     summary: "Show list trims"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list trims"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/trims/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Trim:
 *       type: object
 *       required:
 *         - carSerie
 *         - carModel
 *         - name
 *         - carType
 *       properties:
 *         carSerie: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/Serie"
 *         carModel: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/CarModel"
 *         name:
 *          type: String,
 *          trim: true,
 *          maxlength: 50
 *         starProductionYear:
 *           type: Number
 *         endProductionYear: 
 *           type: Number
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
 *         carSerie: "625de58859f95d0a21d0d71a"
 *         carModel: "625de58859f95d0a21d0d71a"
 *         name: 1.5 CVT (110 h.p.)
 *         starProductionYear: 2005
 *         endProductionYear: 2010
 *         carType: "625de58859f95d0a21d0d71a"
 *         status: Active
 */