const carSpecificationValue = require("../models/carSpecificationValue")

exports.create = async (req, res) => {
    try {
        res.json(await new carSpecificationValue(req.body).save())
    }
    catch (err) {
        res.status(400).send("Create Car Specification Value failed")
    }
}

exports.read = async (req, res) => {
    const CarSpecificationValue = await carSpecificationValue.findOne({
        _id: req.params.id,
        status: "Active"
    }).exec()
    res.json(CarSpecificationValue)
}

exports.update = async (req, res) => {
    try {
        const updated = await carSpecificationValue.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Updated Car Specification Value failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await carSpecificationValue.findOneAndDelete({
            _id: req.params.id
        })
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Specification Value delete failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await carSpecificationValue.findOneAndUpdate(
            { _id: req.params.id },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Specification Value delete failed")
    }
}

exports.count = async (req, res) => {
    let total = await carSpecificationValue.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const CarSpecificationValue = await carSpecificationValue.find({ status: "Active" })
            .skip((current - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(CarSpecificationValue)
    }
    catch (err) {
        res.status(400).send("Car Specification Value pagination falied")
    }
}

exports.list = async (req, res) => {
    let carSpecificationValues = await carSpecificationValue.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(carSpecificationValues)
}