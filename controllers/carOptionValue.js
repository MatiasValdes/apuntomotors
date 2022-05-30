const carOptionValue = require("../models/carOptionValue")

exports.create = async (req, res) => {
    try {
        const { carOption, carEquipment, carType } = req.body
        res.json(await carOptionValue({ carOption, carEquipment, carType }).save())
    }
    catch (err) {
        res.status(400).send("Create Car Option Value failed")
    }
}

exports.read = async (req, res) => {
    const CarOptionValue = await carOptionValue.findOne({
        _id: req.params.id,
        status: "Active"
    }).exec()
    res.json(CarOptionValue)
}

exports.update = async (req, res) => {
    try {
        const updated = await carOptionValue.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Car Option Value updated failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await carOptionValue.findOndeAndDelete({
            _id: req.params.id
        })
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Option Value deleted failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await carOptionValue.findOneAndUpdate(
            { _id: req.params.id },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Option Value deleted failed")
    }
}

exports.count = async (req, res) => {
    let total = await carOptionValue.find({ status: "Active" })
        .estimatedDcoumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const CarOptionValue = await carOptionValue.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage).
            exec()

        res.json(CarOptionValue)
    }
    catch (err) {
        res.status(400).send("Car Option Value pagination failed")
    }
}

exports.list = async (req, res) => {
    let carOptionValues = await carOptionValue.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(carOptionValues)
}