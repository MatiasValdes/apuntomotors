const carSerie = require("../models/carSerie")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const { carModel, carGeneration, name, carType } = req.body
        res.json(await new carSerie({ carModel, carGeneration, name, carType }).save())
    }
    catch (err) {
        res.status(400).send("Car Serie create failed")
    }
}

exports.read = async (req, res) => {
    const CarSerie = await carSerie.findOne({
        _id: req.params.id,
        status: "Active"
    }).exec()
    res.json(CarSerie)
}

exports.update = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }

        const updated = await carSerie.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Car Serie updated failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await carSerie.findOneAndDelete({
            _id: req.params.id
        })
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Serie delete failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await carSerie.findOneAndUpdate(
            { _id: req.params.id },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Serie delete failed")
    }
}

exports.count = async (req, res) => {
    let total = await carSerie.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const CarSerie = await carSerie.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(CarSerie)
    }
    catch (err) {
        res.status(400).send("Car Serie pagination failed")
    }
}

exports.list = async (req, res) => {
    let carSeries = await carSerie.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(carSeries)
}