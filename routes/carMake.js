const express = require("express")
const router = express.Router()
const { authCheck, adminCheck } = require("../middlewares/auth")
const { create, read, update, remove, removeSoft, count, pagination } = require("../controllers/carMake")

router.post("/carMake", authCheck, adminCheck, create)
router.get("/carMake/:slug", read)
router.put("/carMake/:slug", authCheck, adminCheck, update)
router.delete("/carMake/:slug", authCheck, adminCheck, remove)
router.patch("/carMake/:slug", authCheck, adminCheck, removeSoft)
router.get("/carMakes/total", count)
router.post("/carMakes", pagination)

module.exports = router
