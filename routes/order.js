const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateOrder, validateUpdateOrder } = require("../validators/order");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/order")

/**
 * @swagger
 * /order:
 *   post:
 *     summary:  Create order
 *     tags:
 *       - Order
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Order"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       400:
 *         description: bad request
 */
router.post("/order", authCheck, actionsCheck, validateCreateOrder, create)

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     tags:
 *       - Order
 *     summary: "Show data order"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "id"
 *         in: "path"
 *         description: "Show data order active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/order/:id", authCheck, read)

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     tags:
 *       - Order
 *     summary: "Updated data order"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "id"
 *         in: "path"
 *         description: "Updated data order"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Order"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/order/:id", authCheck, actionsCheck, validateUpdateOrder, update)

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     tags:
 *       - Order
 *     summary: "Deleted data order"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "id"
 *         in: "path"
 *         description: "Deleted data order"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("order/:id", authCheck, adminCheck, remove)

/**
 * @swagger
 * /order/{id}:
 *   patch:
 *     tags:
 *       - Order
 *     summary: "Soft deleted data order"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "id"
 *         in: "path"
 *         description: "Soft deleted data order"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/order/:id", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /orders/total:
 *   get:
 *     tags:
 *       - Order
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     summary: "Get total number orders"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/orders/total", authCheck, count)

/**
 * @swagger
 * /orders:
 *   post:
 *     summary:  Show data orders paginated
 *     tags:
 *       - Order
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Order"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       400:
 *         description: bad request
 */
router.post("/orders", authCheck, pagination)

/**
 * @swagger
 * /orders/{count}:
 *   get:
 *     tags:
 *       - Order
 *     summary: "Show list orders"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *       - name: "count"
 *         in: "path"
 *         description: "Show list orders"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/orders/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Order: 
 *       type: object
 *       required:
 *         - car
 *         - dateInit
 *         - dateEnd
 *         - assignedFor
 *         - service
 *       properties:
 *         orderStatus:
 *           type: string
 *           default: "Not Processed"
 *         car: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/Car"
 *         images: 
 *           type: Array
 *         comments:
 *           type: string
 *           maxlength: 2000
 *         dateInit:
 *           type: Date
 *         dateEnd:
 *           type: Date
 *         assignedFor:
 *           type: ObjectId
 *           $ref: "#/components/schemas/User" 
 *         status: 
 *           type: string
 *           default: "Active"
 *           enum: 
 *           - "Active"
 *           - "Inactive" 
 *       example: 
 *         orderStatus: "Not Processed"
 *         car: "625de58859f95d0a21d0d71a"
 *         images: []
 *         comments: Una vez reparado, se debe entregar lavado y aspirado
 *         dateInit: 26-05-2022
 *         dateEnd: 28-05-22
 *         assignedFor: "625de58859f95d0a21d0d71a"
 *         service: ["625de58859f95d0a21d0d71a", "625de58859f95d0a21d0d71a", "625de58859f95d0a21d0d71a"]
 *         status: Active
 */