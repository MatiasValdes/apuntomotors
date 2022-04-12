const admin = require("../firebase")
const user = require("../models/user")

exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        req.user = firebaseUser
        next()
    }
    catch (err) {
        res.status(401).json({
            err: "Invalid or expire token",
        })
    }
}

exports.adminCheck = async (req, res, next) => {
    const { email } = req.User
    const adminUser = await User.find({ email: email }).exec()

    if (adminUser.role !== "admin") {
        res.status(403).json({
            err: "Admin resource. Access denied."
        })
    } else {
        next()
    }
}
