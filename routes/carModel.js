const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateModel, validateUpdateModel } = require("../validators/carModel");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/carModel")

/**
 * @swagger
 * /model:
 *   post:
 *     summary:  Create model
 *     tags:
 *       - Model
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CarModel"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CarModel"
 *       400:
 *         description: bad request
 */
router.post("/model", authCheck, actionsCheck, validateCreateModel, create)

/**
 * @swagger
 * /model/{slug}:
 *   get:
 *     tags:
 *       - Model
 *     summary: "Show data model"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Show data model active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/model/:slug", authCheck, read)

/**
 * @swagger
 * /model/{slug}:
 *   put:
 *     tags:
 *       - Model
 *     summary: "Updated data model"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Updated data model"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CarModel"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/model/:slug", authCheck, actionsCheck, validateUpdateModel, update)

/**
 * @swagger
 * /model/{slug}:
 *   delete:
 *     tags:
 *       - Model
 *     summary: "Deleted data model"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Deleted data model"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("model/:slug", authCheck, adminCheck, remove)

/**
 * @swagger
 * /model/{slug}:
 *   patch:
 *     tags:
 *       - Model
 *     summary: "Soft deleted data model"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Soft deleted data model"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/model/:slug", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /models/total:
 *   get:
 *     tags:
 *       - Model
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     summary: "Get total number models"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/models/total", authCheck, count)

/**
 * @swagger
 * /models:
 *   post:
 *     summary:  Show data models paginated
 *     tags:
 *       - Model
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CarModel"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CarModel"
 *       400:
 *         description: bad request
 */
router.post("/models", authCheck, pagination)

/**
 * @swagger
 * /models/{count}:
 *   get:
 *     tags:
 *       - Model
 *     summary: "Show list models"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "count"
 *         in: "path"
 *         description: "Show list models"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/models/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     CarModel:
 *       type: object
 *       required:
 *         - name
 *         - carMake
 *         - cartype
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
 *         carMake:
 *           type: ObjectId
 *           $ref: "#/components/schemas/Make"
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
 *         name: Honda
 *         slug: honda
 *         status: Active
 *         cartype: "625de58859f95d0a21d0d71a"
 */