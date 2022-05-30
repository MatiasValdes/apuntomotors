const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateCar, validateUpdateCar } = require("../validators/car");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/car")

/**
 * @swagger
 * /car:
 *   post:
 *     summary:  Create car
 *     tags:
 *       - Car
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Car"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Car"
 *       400:
 *         description: bad request
*/
router.post("/car", authCheck, actionsCheck, validateCreateCar, create)

/**
 * @swagger
 * /cars/{patent}:
 *   get:
 *     tags:
 *       - Car
 *     summary: "Show data car"
 *     parameters:
 *       - name: "patent"
 *         in: "path"
 *         description: "Show data car active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
*/
router.get("/cars/:patent", authCheck, read)

/**
 * @swagger
 * /car/{patent}:
 *   put:
 *     tags:
 *       - Car
 *     summary: "Updated data Car"
 *     parameters:
 *       - name: "patent"
 *         in: "path"
 *         description: "Updated data Car"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Car"
 *     responses:
 *       200: 
 *          description: ok   
*/
router.put("/car/:patent", authCheck, actionsCheck, validateUpdateCar, update)

/**
 * @swagger
 * /car/{patent}:
 *   delete:
 *     tags:
 *       - Car
 *     summary: "Deleted data Car"
 *     parameters:
 *       - name: "patent"
 *         in: "path"
 *         description: "Deleted data Car"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
*/
router.delete("car/:patent", authCheck, adminCheck, remove)

/**
 * @swagger
 * /car/{patent}:
 *   patch:
 *     tags:
 *       - Car
 *     summary: "Soft deleted data Car"
 *     parameters:
 *       - name: "patent"
 *         in: "path"
 *         description: "Soft deleted data Car"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
*/
router.patch("/car/:patent", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /cars/total:
 *   get:
 *     tags:
 *       - Car
 *     summary: "Get total number cars"
 *     responses:
 *       200: 
 *          description: ok   
*/
router.get("/cars/total", authCheck, count)

/**
 * @swagger
 * /car:
 *   post:
 *     summary:  Show data car paginated
 *     tags:
 *       - Car
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Car"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Car"
 *       400:
 *         description: bad request
*/
router.post("/cars", authCheck, pagination)

/**
 * @swagger
 * /cars/{count}:
 *   patch:
 *     tags:
 *       - Car
 *     summary: "Show list cars"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list cars"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
*/
router.get("/cars/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:  
 *         - carMake
 *         - carModel
 *         - carSerie
 *         - carTrim
 *         - carType
 *         - client
 *         - patent
 *       properties:
 *         carMake:
 *           type: ObjectId
 *           $ref: "#/components/schemas/Make"
 *         carModel:
 *           type: ObjectId
 *           $ref: "#/components/schemas/CarModel"
 *         carSerie: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/Serie"
 *         carTrim:
 *           type: ObjectId
 *           $ref: "#/components/schemas/Trim"
 *         carType:
 *           type: ObjectId
 *           $ref: "#/components/schemas/CarType" 
 *         client: 
 *           type: ObjectId
 *           $ref: "#/components/schemas/User"
 *         patent:
 *           type: string
 *           unique: true
 *           minlength: 6
 *           maxlength: 6
 *           trim: true
 *         comment:
 *           type: string
 *           maxlength: 2000
 *         status: 
 *           type: string
 *           default: "Active"
 *           enum: 
 *           - "Active"
 *           - "Inactive" 
 *       example: 
 *         carMake: "625de58859f95d0a21d0d71a"
 *         carModel: "625de58859f95d0a21d0d71a"
 *         carSerie: "625de58859f95d0a21d0d71a"
 *         carTrim: "625de58859f95d0a21d0d71a"
 *         carType: "625de58859f95d0a21d0d71a"
 *         client: "625de58859f95d0a21d0d71a"
 *         patent: GDBD24
 *         comment: Motor modificado para carreras
 *         status: Active
*/