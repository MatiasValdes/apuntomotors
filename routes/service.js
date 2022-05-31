const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateService, validateUpdateService } = require("../validators/service");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/service")

/**
 * @swagger
 * /service:
 *   post:
 *     summary:  Create service
 *     tags:
 *       - Service
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Service"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Service"
 *       400:
 *         description: bad request
 */
router.post("/service", authCheck, actionsCheck, validateCreateService, create)

/**
 * @swagger
 * /service/{slug}:
 *   get:
 *     tags:
 *       - Service
 *     summary: "Show data service"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Show data service active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/service/:slug", authCheck, read)

/**
 * @swagger
 * /service/{slug}:
 *   put:
 *     tags:
 *       - Service
 *     summary: "Updated data service"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Updated data service"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Service"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/service/:slug", authCheck, actionsCheck, validateUpdateService, update)

/**
 * @swagger
 * /service/{slug}:
 *   delete:
 *     tags:
 *       - Service
 *     summary: "Deleted data service"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Deleted data service"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("service/:slug", authCheck, adminCheck, remove)

/**
 * @swagger
 * /service/{slug}:
 *   patch:
 *     tags:
 *       - Service
 *     summary: "Soft deleted data service"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "slug"
 *         in: "path"
 *         description: "Soft deleted data service"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/service/:slug", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /services/total:
 *   get:
 *     tags:
 *       - Service
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     summary: "Get total number services"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/services/total", authCheck, count)

/**
 * @swagger
 * /services:
 *   post:
 *     summary:  Show data services paginated
 *     tags:
 *       - Service
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Service"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Service"
 *       400:
 *         description: bad request
 */
router.post("/services", authCheck, pagination)

/**
 * @swagger
 * /services/{count}:
 *   get:
 *     tags:
 *       - Service
 *     summary: "Show list services"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "count"
 *         in: "path"
 *         description: "Show list services"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/services/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Service: 
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           trim: true
 *           maxlength: 50
 *           text: true,
 *         slug:
 *           type: string
 *           unique: true
 *           lowercase: true
 *           index: true
 *         description:
 *           type: string
 *           maxlength: 2000
 *         price:
 *           type: Number
 *         status: 
 *           type: string
 *           default: "Active"
 *           enum: 
 *           - "Active"
 *           - "Inactive" 
 *       example: 
 *         name: Ajuste de Motor
 *         slug: ajuste-de-motor
 *         description: Procedimiento en el cual se cambian multiples piezas del motor
 *         price: 100.000
 *         status: Active
 */