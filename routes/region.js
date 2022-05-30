const express = require("express")
const router = express.Router()

const { authCheck, adminCheck, actionsCheck } = require("../middlewares/auth")

const { validateCreateRegion, validateUpdateRegion } = require("../validators/region");

const {
    create,
    read,
    update,
    remove,
    removeSoft,
    count,
    pagination,
    list
} = require("../controllers/region")

/**
 * @swagger
 * /region:
 *   post:
 *     summary:  Create region
 *     tags:
 *       - Region
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Region"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Region"
 *       400:
 *         description: bad request
 */
router.post("/region", authCheck, actionsCheck, validateCreateRegion, create)

/**
 * @swagger
 * /region/{slug}:
 *   get:
 *     tags:
 *       - Region
 *     summary: "Show data region"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Show data region active"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/region/:slug", authCheck, read)

/**
 * @swagger
 * /region/{slug}:
 *   put:
 *     tags:
 *       - Region
 *     summary: "Updated data region"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Updated data region"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Region"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/region/:slug", authCheck, actionsCheck, validateUpdateRegion, update)

/**
 * @swagger
 * /region/{slug}:
 *   delete:
 *     tags:
 *       - Region
 *     summary: "Deleted data region"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Deleted data region"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.delete("region/:slug", authCheck, adminCheck, remove)

/**
 * @swagger
 * /region/{slug}:
 *   patch:
 *     tags:
 *       - Region
 *     summary: "Soft deleted data region"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Soft deleted data region"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/region/:slug", authCheck, actionsCheck, removeSoft)

/**
 * @swagger
 * /regions/total:
 *   get:
 *     tags:
 *       - Region
 *     summary: "Get total number regions"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/regions/total", authCheck, count)

/**
 * @swagger
 * /regions:
 *   post:
 *     summary:  Show data regions paginated
 *     tags:
 *       - Region
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Region"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Region"
 *       400:
 *         description: bad request
 */
router.post("/regions", authCheck, pagination)

/**
 * @swagger
 * /regions/{count}:
 *   get:
 *     tags:
 *       - Region
 *     summary: "Show list regions"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Show list regions"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/regions/:count", list)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Region: 
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
 *         name: VIII Región del Bío Bío
 *         slug: viii-region-del-bio-bio
 *         status: Active
 */