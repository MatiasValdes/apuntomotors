const express = require("express")
const router = express.Router()

const { authCheck, adminCheck } = require("../middlewares/auth")

const { validateCreateType, validateUpdateType } = require("../validators/carType");

const {create, read, update, removeSoft, remove, pagination, list} = require("../controllers/carType")

/**
 * @swagger
 * /carType:
 *   post:
 *     summary:  Create type
 *     tags:
 *       - CarType
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CarType"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CarType"
 *       400:
 *         description: bad request
 */
router.post("/carType", authCheck, adminCheck, validateCreateType, create)

/**
 * @swagger
 * /carType/{slug}:
 *   get:
 *     tags:
 *       - CarType
 *     summary: "Show data type"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Show data type active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/carType/:slug", read)

/**
 * @swagger
 * /carType/{slug}:
 *   put:
 *     tags:
 *       - CarType
 *     summary: "Updated data type"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Updated data type"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CarType"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/carType/:slug", authCheck, adminCheck, validateUpdateType, update)

/**
 * @swagger
 * /carType/{slug}:
 *   patch:
 *     tags:
 *       - CarType
 *     summary: "Soft deleted data type"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Soft deleted data type"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/carType/:slug", authCheck, adminCheck, removeSoft)

/**
 * @swagger
 * /carType/{slug}:
 *   delete:
 *     tags:
 *       - CarType
 *     summary: "Deleted data type"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Deleted data type"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("/carType/:slug", authCheck, adminCheck, remove)

/**
 * @swagger
 * /carTypes/total:
 *   get:
 *     tags:
 *       - CarType
 *     summary: "Get total number type"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.post("/carTypes", authCheck, pagination)

/**
 * @swagger
 * /carType/{count}:
 *   get:
 *     tags:
 *       - CarType
 *     summary: "Show list types"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list types"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/carType/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     CarType: 
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           trim: true
 *           maxlength: 32
 *         slug:
 *           type: string
 *           unique: true
 *           lowercase: true
 *           index: true
 *         status: 
 *           type: string
 *           default: "Active"
 *           enum: 
 *           - "Active"
 *           - "Inactive" 
 *       example: 
 *         name: Car
 *         slug: car
 *         status: Active
 */