const express = require("express")
const router = express.Router()

const { authCheck, adminCheck } = require("../middlewares/auth")

const { validateCreateMake, validateUpdateMake } = require("../validators/carMake");

const { create, read, update, remove, removeSoft, count, pagination, list } = require("../controllers/carMake")

/**
 * @swagger
 * /make:
 *   post:
 *     summary:  Create make
 *     tags:
 *       - Make
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Make"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Make"
 *       400:
 *         description: bad request
 */
router.post("/make", authCheck, adminCheck, validateCreateMake, create)

/**
 * @swagger
 * /make/{slug}:
 *   get:
 *     tags:
 *       - Make
 *     summary: "Show data make"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Show data make active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/make/:slug", read)

/**
 * @swagger
 * /make/{slug}:
 *   put:
 *     tags:
 *       - Make
 *     summary: "Updated data make"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Updated data make"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Make"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/make/:slug", authCheck, adminCheck, validateUpdateMake, update)

/**
 * @swagger
 * /make/{slug}:
 *   delete:
 *     tags:
 *       - Make
 *     summary: "Deleted data make"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Deleted data make"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("/make/:slug", authCheck, adminCheck, remove)

/**
 * @swagger
 * /make/{slug}:
 *   patch:
 *     tags:
 *       - Make
 *     summary: "Soft deleted data make"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Soft deleted data make"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/make/:slug", authCheck, adminCheck, removeSoft)

/**
 * @swagger
 * /makes/total:
 *   get:
 *     tags:
 *       - Make
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     summary: "Get total number makes"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/makes/total", count)

/**
 * @swagger
 * /makes:
 *   post:
 *     summary:  Show data makes paginated
 *     tags:
 *       - Make
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Make"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Make"
 *       400:
 *         description: bad request
 */
router.post("/makes", pagination)

/**
 * @swagger
 * /makes/{count}:
 *   get:
 *     tags:
 *       - Make
 *     summary: "Show list makes"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "count"
 *         in: "path"
 *         description: "Show list makes"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/makes/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Make: 
 *       type: object
 *       required:
 *         - name
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
 *         status: 
 *           type: string
 *           default: "Active"
 *           enum: 
 *           - "Active"
 *           - "Inactive" 
 *         cartype:
 *           type: ObjectId
 *           $ref: "#/components/schemas/CarType" 
 *       example: 
 *         name: Honda
 *         slug: honda
 *         status: Active
 *         cartype: "625de58859f95d0a21d0d71a"
 */