const admin = require("../firebase")
const User = require("../models/user")

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
    const { email } = req.body
    const adminUser = await User.find({ email: email }).exec()

    if (adminUser.role !== "Admin") {
        res.status(403).json({
            err: "Admin resource. Access denied."
        })
    } else {
        next()
    }
}

exports.employeeCheck = async (req, res, next) => {
    const { email } = req.User
    const adminUser = await User.find({ email: email }).exec()

    if (adminUser.role !== "Employee") {
        res.status(403).json({
            err: "Admin resource. Access denied."
        })
    } else {
        next()
    }
}

exports.actionsCheck = async (req, res, next) => {
    const { email } = req.User
    const adminUser = await User.find({ email: email }).exec()

    if (adminUser.role !== "Employee" || adminUser.role !== "Admin") {
        res.status(403).json({
            err: "Access denied."
        })
    } else {
        next()
    }
}