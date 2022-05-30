const carModel = require("../models/carModel")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const { name, carMake, carType } = req.body
        res.json(await new carModel({ name, slug: slugify(name), carMake, carType }).save())
    }
    catch (err) {
        res.status(400).send("Create Car Model failed")
    }
}

exports.read = async (req, res) => {
    const CarModel = await carModel.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec()
    res.json(CarModel)
}

exports.update = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }
        const updated = await carModel.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Car Model updated failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await carModel.findOneAndDelete({
            slug: req.params.slug
        })
        res.json(deleted)
    }
    catch (err) {
        return res.status(400).send("Car Model deleted failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await carModel.findOneAndUpdate(
            { slug: req.params.slug },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car model deleted failed")
    }
}

exports.count = async (req, res) => {
    let total = await carModel.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const CarModel = await carModel.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(CarModel)
    }
    catch (err) {
        res.status(400).send("Car Model pagination failed")
    }
}

exports.list = async (req, res) => {
    let carModels = await carModel.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(carModels)
}