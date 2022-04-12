const express = require("express")
const router = express.Router()
const { authCheck, adminCheck } = require("../middlewares/auth")
const {create, list, read, update, removeSoft, remove} = require("../controllers/carType")

router.post("/carType", authCheck, adminCheck, create)
router.get("/carTypes", list)
router.get("/carType/:slug", read)
router.put("/carType/:slug", authCheck, adminCheck, update)
router.patch("/carType/:slug", authCheck, adminCheck, removeSoft)
router.delete("/carType/:slug", authCheck, adminCheck, remove)

module.exports = router
