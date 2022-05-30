const Order = require("../models/order")

exports.create = async (req, res) => {
    try {
        res.json(await new Order(req.body).save())
    }
    catch (err) {
        res.status(400).send("Order carte failed")
    }
}

exports.read = async (req, res) => {
    const order = await Order.findOne({
        _id: req.params.id,
        status: "Active"
    }).exec()
    res.json(order)
}

exports.update = async (req, res) => {
    try {
        const updated = await Order.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Order update failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Order.findOneAndDelete(
            { _id: req.params.id }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Order delete failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await Order.findOneAndUpdte(
            { _id: req.params.id },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Order delete failed")
    }
}

exports.count = async (req, res) => {
    let total = await Order.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const orders = await Order.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(orders)
    }
    catch (err) {
        res.status(400).send("Order pagination failed")
    }
}

exports.list = async (req, res) => {
    let orders = await Order.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(orders)
}