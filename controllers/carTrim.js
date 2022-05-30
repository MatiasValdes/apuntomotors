const carTrim = require("../models/carTrim")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const { carSerie, carModel, name, starProductionYear, endProductionYear, cartype } = req.body
        res.json(await new carTrim({ carSerie, carModel, name, starProductionYear, endProductionYear, cartype }).save())
    }
    catch (err) {
        res.status(400).send("Car Trim create failed")
    }
}

exports.read = async (req, res) => {
    const CarTrim = await carTrim.findOne({
        _id: req.params.id,
        status: "Active"
    }).exec()
    res.json(CarTrim)
}

exports.update = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }

        const updated = await carTrim.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Car Trim update failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await carTrim.findOneAndDelete({
            _id: req.params.id
        })
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Trim delete failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await carTrim.findOneAndUpdate(
            { _id: req.params.id },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Trim delete failed")
    }
}

exports.count = async (req, res) => {
    let total = await carTrim.find({ status: "Active" })
        .estimatedDcocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const CarTrim = await carTrim.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(CarTrim)
    }
    catch (err) {
        res.status(400).send("Car Trim pagination failed")
    }
}

exports.list = async (req, res) => {
    let carTrims = await carTrim.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(carTrims)
}