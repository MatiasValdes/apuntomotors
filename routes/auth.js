const express = require("express")
const router = express.Router()

const { authCheck, adminCheck } = require("../middlewares/auth")

const { createOrUpdateUser, currentUser } = require("../controllers/auth")

/**
 * @swagger
 * schemes:
 *   - "https"
 *   - "http"
 * /create-or-update-user:
 *  post:
 *     summary: Create or Update User with Firebase Auth
 *     tags:
 *         - Auth
 *     consumes:
 *         - "application/json"
 *     produces:
 *         - "application/json"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *      "200":
 *         description: User Information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *      "401":
 *         description: Invalid or expired token
*/
router.post("/create-or-update-user", authCheck, createOrUpdateUser)

/**
 * @swagger
 * schemes:
 *   - "https"
 *   - "http"
 * /current-user:
 *  post:
 *     summary: Get Logged User Information
 *     tags:
 *         - Auth
 *     consumes:
 *         - "application/json"
 *     produces:
 *         - "application/json"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     responses:
 *      "200":
 *         description: User Information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *      "401":
 *         description: Invalid or expired token
*/
router.post("/current-user", authCheck, currentUser)

/**
 * @swagger
 * schemes:
 *   - "https"
 *   - "http"
 * /current-admin:
 *  post:
 *     summary: Get Logged Admin User Information
 *     tags:
 *         - Auth
 *     consumes:
 *         - "application/json"
 *     produces:
 *         - "application/json"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     responses:
 *      "200":
 *         description: User Information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *      "401":
 *         description: Invalid or expired token
*/
router.post("/current-admin", authCheck, adminCheck, currentUser)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - rut
 *         - email
 *         - phone
 *         - address
 *         - comuna
 *         - role
 *       properties:
 *         name:
 *            type: string
 *         rut:
 *            type: string
 *            index: true
 *         email:
 *            type: string
 *            index: true
 *         phone: 
 *            type: Number
 *         address: 
 *            type: String
 *         comuna: 
 *            $ref: "#/components/schemas/Comuna"
 *         role:
 *            type: string
 *       example:
 *         name: Matias Valdes
 *         rut: 11.111.111-1
 *         email: matiasvaldes@midominio.cl
 *         phone: 990902080
 *         address: Calle sin nombre 123
 *         comuna: springfield
 *         role: Admin   
 */