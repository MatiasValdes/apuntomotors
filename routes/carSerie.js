const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateSerie, validateUpdateSerie } = require("../validators/carSerie");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/carSerie")

/**
 * @swagger
 * /serie:
 *   post:
 *     summary:  Create serie
 *     tags:
 *       - Serie
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Serie"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Serie"
 *       400:
 *         description: bad request
 */
router.post("/serie", authCheck, actionsCheck, validateCreateSerie, create)

/**
 * @swagger
 * /serie/{id}:
 *   get:
 *     tags:
 *       - Serie
 *     summary: "Show data serie"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Show data serie active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/serie/:id", authCheck, read)

/**
 * @swagger
 * /serie/{id}:
 *   put:
 *     tags:
 *       - Serie
 *     summary: "Updated data serie"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Updated data serie"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Serie"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/serie/:id", authCheck, actionsCheck, validateUpdateSerie, update)

/**
 * @swagger
 * /serie/{id}:
 *   delete:
 *     tags:
 *       - Serie
 *     summary: "Deleted data serie"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Deleted data serie"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("serie/:id", authCheck, adminCheck, remove)

/**
 * @swagger
 * /serie/{id}:
 *   patch:
 *     tags:
 *       - Serie
 *     summary: "Soft deleted data serie"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Soft deleted data serie"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/serie/:id", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /series/total:
 *   get:
 *     tags:
 *       - Serie
 *     summary: "Get total number series"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/series/total", authCheck, count)

/**
 * @swagger
 * /series:
 *   post:
 *     summary:  Show data series paginated
 *     tags:
 *       - Serie
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Serie"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Serie"
 *       400:
 *         description: bad request
 */
router.post("/series", authCheck, pagination)

/**
 * @swagger
 * /series/{count}:
 *   get:
 *     tags:
 *       - Serie
 *     summary: "Show list series"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list series"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/series/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Serie: 
 *       type: object
 *       required:
 *         - carModel
 *         - carGeneration
 *         - name
 *         - cartype
 *       properties:
 *         carModel: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/CarModel"
 *         carGeneration: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/Generation"
 *         name:
 *           type: string
 *           trim: true
 *           maxlength: 100
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
 *         carGeneration: "625de58859f95d0a21d0d71a"
 *         name: Wagon
 *         cartype: "625de58859f95d0a21d0d71a"
 *         status: Active
 */