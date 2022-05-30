const carGeneration = require("../models/carGeneration")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const { carModel, name, yearBegin, yearEnd, carType } = req.body
        res.json(await new carGeneration({ carModel, name, yearBegin, yearEnd, carType }).save())
    }
    catch (err) {
        res.status(400).send("Create Car Generation failed")
    }
}

exports.read = async (req, res) => {
    const CarGeneration = await carGeneration.findOne({
        _id: req.params.id,
        status: "Active"
    }).exec()
    res.json(CarGeneration)
}

exports.update = async (req, res) => {
    try {
        const updated = await carGeneration.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Car Generation updated failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await carGeneration.findOneAndDelete({
            _id: req.params.id
        })
        res.json(deleted)
    }
    catch (err) {
        return res.status(400).send("Car Generation removed failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await carGeneration.findOneAndUpdate(
            { _id: req.params.id },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Generation deleted failed")
    }
}

exports.count = async (req, res) => {
    let total = await carGeneration.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const CarGeneration = await carGeneration.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(CarGeneration)
    }
    catch (err) {
        res.status(400).send("Car Generation pagination failed")
    }
}

exports.list = async (req, res) => {
    let carGenerations = await carGeneration.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(carGenerations)
}