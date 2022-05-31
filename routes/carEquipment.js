const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateEquipment, validateUpdateEquipment } = require("../validators/carEquipment");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/carEquipment")

/**
 * @swagger
 * /equipment:
 *   post:
 *     summary:  Create equipment
 *     tags:
 *       - Equipment
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Equipment"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Equipment"
 *       400:
 *         description: bad request
 */
router.post("/equipment", authCheck, actionsCheck, validateCreateEquipment, create)

/**
 * @swagger
 * /equipment/{slug}:
 *   get:
 *     tags:
 *       - Equipment
 *     summary: "Show data equipment"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Show data equipment active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/equipment/:slug", authCheck, read)

/**
 * @swagger
 * /equipment/{slug}:
 *   put:
 *     tags:
 *       - Equipment
 *     summary: "Updated data equipment"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Updated data equipment"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Equipment"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/equipment/:slug", authCheck, actionsCheck, validateUpdateEquipment, update)

/**
 * @swagger
 * /equipment/{slug}:
 *   delete:
 *     tags:
 *       - Equipment
 *     summary: "Deleted data equipment"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Deleted data equipment"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("equipment/:slug", authCheck, adminCheck, remove)

/**
 * @swagger
 * /equipment/{slug}:
 *   patch:
 *     tags:
 *       - Equipment
 *     summary: "Soft deleted data equipment"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Soft deleted data equipment"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/equipment/:slug", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /equipments/total:
 *   get:
 *     tags:
 *       - Equipment
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     summary: "Get total number equipments"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/equipments/total", authCheck, count)

/**
 * @swagger
 * /equipments:
 *   post:
 *     summary:  Show data equipment paginated
 *     tags:
 *       - Equipment
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Equipment"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Equipment"
 *       400:
 *         description: bad request
 */
router.post("/equipments", authCheck, pagination)

/**
 * @swagger
 * /equipments/{count}:
 *   get:
 *     tags:
 *       - Equipment
 *     summary: "Show list equipments"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "count"
 *         in: "path"
 *         description: "Show list equipments"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/equipments/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       required:  
 *         - name
 *         - year
 *         - carTrim
 *         - cartype
 *       properties:
 *         name:
 *           type: string
 *           trim: true
 *           maxlength: 300
 *         slug:
 *           type: string
 *           unique: true
 *           lowercase: true
 *           index: true
 *         year:
 *           type: Number
 *         carTrim: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/Trim"
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
 *         name: Elite
 *         year: 2013
 *         slug: elite
 *         carTrim: "625de58859f95d0a21d0d71a"
 *         cartype: "625de58859f95d0a21d0d71a"
 *         status: Active
 */