const Car = require("../models/car")

exports.create = async (req, res) => {
    try {
        const {
            carEquipment,
            carGeneration,
            carMake,
            carModel,
            carOption,
            carOptionValue,
            carSerie,
            carSpecefication,
            carSpeceficationValue,
            carTrim,
            carType,
            client,
            patent,
            comment
        } = req.body

        res.json(await new Car({
            carEquipment,
            carGeneration,
            carMake,
            carModel,
            carOption,
            carOptionValue,
            carSerie,
            carSpecefication,
            carSpeceficationValue,
            carTrim,
            carType,
            client,
            patent,
            comment
        }).save())
    }
    catch (err) {
        res.status(400).send("Car create failed")
    }
}

exports.read = async (req, res) => {
    const car = await Car.findOne({ patent: req.params.patent, status: "Active" }).exec()
    res.json(car)
}

exports.update = async (req, res) => {
    try {
        const updated = await Car.findOneAndUpdate(
            { patent: req.params.patent },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Car updated failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Car.findOneAndDeleted({
            patent: req.params.patent
        })
        res.json(deleted)
    }
    catch (err) {
        return res.status(400).send("Car deleted failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await Car.findOneAndUpdate(
            { patent: req.params.patent },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car deleted failed")
    }
}

exports.count = async (req, res) => {
    let total = await Car.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const car = await Car.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(car)
    }
    catch (err) {
        res.status(400).send("Car pagination failed")
    }
}

exports.list = async (req, res) => {
    let cars = await Car.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(cars)
}