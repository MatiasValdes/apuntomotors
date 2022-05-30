const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateSpecification, validateUpdateSpecification } = require("../validators/carSpecification");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/carSpecification")

/**
 * @swagger
 * /specification:
 *   post:
 *     summary:  Create specification
 *     tags:
 *       - Specification
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Specification"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Specification"
 *       400:
 *         description: bad request
 */
router.post("/specification", authCheck, actionsCheck, validateCreateSpecification, create)

/**
 * @swagger
 * /specification/{slug}:
 *   get:
 *     tags:
 *       - Specification
 *     summary: "Show data specification"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Show data specification active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/specification/:slug", authCheck, read)

/**
 * @swagger
 * /specification/{slug}:
 *   put:
 *     tags:
 *       - Specification
 *     summary: "Updated data specification"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Updated data specification"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Specification"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/specification/:slug", authCheck, actionsCheck, validateUpdateSpecification, update)

/**
 * @swagger
 * /specification/{slug}:
 *   delete:
 *     tags:
 *       - Specification
 *     summary: "Deleted data specification"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Deleted data specification"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("specification/:slug", authCheck, adminCheck, remove)

/**
 * @swagger
 * /specification/{slug}:
 *   patch:
 *     tags:
 *       - Specification
 *     summary: "Soft deleted data specification"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Soft deleted data specification"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/specification/:slug", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /specifications/total:
 *   get:
 *     tags:
 *       - Specification
 *     summary: "Get total number specifications"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/specifications/total", authCheck, count)

/**
 * @swagger
 * /specifications:
 *   post:
 *     summary:  Show data specifications paginated
 *     tags:
 *       - Specification
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Specification"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Specification"
 *       400:
 *         description: bad request
 */
router.post("/specifications", authCheck, pagination)

/**
 * @swagger
 * /specifications/{count}:
 *   get:
 *     tags:
 *       - Specification
 *     summary: "Show list specifications"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list specifications"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/specifications/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Specification:
 *       type: object
 *       required:
 *         - name
 *         - cartype
 *       properties:
 *         name:
 *           type: string
 *           trim: true
 *           maxlength: 100
 *         slug:
 *           type: string
 *           unique: true
 *           lowercase: true
 *           index: true
 *         parent:
 *           type: ObjectId
 *           $ref: "#/components/schemas/Specification"
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
 *         name: Number of seater
 *         slug: number-of-seater
 *         parent: "625de58859f95d0a21d0d71a"
 *         cartype: "625de58859f95d0a21d0d71a"
 *         status: Active
 */