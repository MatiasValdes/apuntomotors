const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateComuna, validateUpdateComuna } = require("../validators/comuna");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/comuna")

/**
 * @swagger
 * /comuna:
 *   post:
 *     summary:  Create comuna
 *     tags:
 *       - Comuna
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comuna"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comuna"
 *       400:
 *         description: bad request
 */
router.post("/comuna", authCheck, actionsCheck, validateCreateComuna, create)

/**
 * @swagger
 * /comuna/{slug}:
 *   get:
 *     tags:
 *       - Comuna
 *     summary: "Show data comuna"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Show data comuna active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/comuna/:slug", authCheck, read)

/**
 * @swagger
 * /comuna/{slug}:
 *   put:
 *     tags:
 *       - Comuna
 *     summary: "Updated data comuna"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Updated data comuna"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comuna"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/comuna/:slug", authCheck, actionsCheck, validateUpdateComuna, update)

/**
 * @swagger
 * /comuna/{slug}:
 *   delete:
 *     tags:
 *       - Comuna
 *     summary: "Deleted data comuna"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Deleted data comuna"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("comuna/:slug", authCheck, adminCheck, remove)

/**
 * @swagger
 * /comuna/{slug}:
 *   patch:
 *     tags:
 *       - Comuna
 *     summary: "Soft deleted data comuna"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Soft deleted data comuna"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/comuna/:slug", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /comunas/total:
 *   get:
 *     tags:
 *       - Comuna
 *     summary: "Get total number comunas"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/comunas/total", authCheck, count)

/**
 * @swagger
 * /comunas:
 *   post:
 *     summary:  Show data comunas paginated
 *     tags:
 *       - Comuna
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comuna"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comuna"
 *       400:
 *         description: bad request
 */
router.post("/comunas", authCheck, pagination)

/**
 * @swagger
 * /comunas/{count}:
 *   get:
 *     tags:
 *       - Comuna
 *     summary: "Show list comunas"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list comunas"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/comunas/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Comuna: 
 *       type: object
 *       required:
 *         - name
 *         - region
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
 *         region:
 *           type: ObjectId
 *           $ref: "#/components/schemas/Region"
 *         status: 
 *           type: string
 *           default: "Active"
 *           enum: 
 *           - "Active"
 *           - "Inactive" 
 *       example: 
 *         name: Puente Alto
 *         slug: puente-alto
 *         region: "625de58859f95d0a21d0d71a"
 *         status: Active
 */