const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateOption, validateUpdateOption } = require("../validators/carOption");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/carOption")

/**
 * @swagger
 * /option:
 *   post:
 *     summary:  Create option
 *     tags:
 *       - Option
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Option"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Option"
 *       400:
 *         description: bad request
 */
router.post("/option", authCheck, actionsCheck, validateCreateOption, create)

/**
 * @swagger
 * /option/{slug}:
 *   get:
 *     tags:
 *       - Option
 *     summary: "Show data option"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Show data option active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/option/:slug", authCheck, read)

/**
 * @swagger
 * /option/{slug}:
 *   put:
 *     tags:
 *       - Option
 *     summary: "Updated data option"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Updated data option"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Option"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/option/:slug", authCheck, actionsCheck, validateUpdateOption, update)

/**
 * @swagger
 * /option/{slug}:
 *   delete:
 *     tags:
 *       - Option
 *     summary: "Deleted data option"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Deleted data option"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("option/:slug", authCheck, adminCheck, remove)

/**
 * @swagger
 * /option/{slug}:
 *   patch:
 *     tags:
 *       - Option
 *     summary: "Soft deleted data option"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Soft deleted data option"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/option/:slug", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /options/total:
 *   get:
 *     tags:
 *       - Option
 *     summary: "Get total number options"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/options/total", authCheck, count)

/**
 * @swagger
 * /options:
 *   post:
 *     summary:  Show data options paginated
 *     tags:
 *       - Option
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Option"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Option"
 *       400:
 *         description: bad request
 */
router.post("/options", authCheck, pagination)

/**
 * @swagger
 * /options/{count}:
 *   get:
 *     tags:
 *       - Option
 *     summary: "Show list options"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list options"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/options/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Option: 
 *       type: object
 *       required:
 *         - name
 *         - parent
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
 *         parent:
 *           type: ObjectId
 *           $ref: "#/components/schemas/Option"
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
 *         name: Power steering
 *         slug: power-steering
 *         parent: "625de58859f95d0a21d0d71a"
 *         cartype: "625de58859f95d0a21d0d71a"
 *         status: Active
 */