const carMake = require("../models/carMake")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.name)
        res.json(await new carMake(req.body).save())
    }
    catch (err) {
        res.status(400).send("Car Make created failed")
    }
}

exports.read = async (req, res) => {
    const CarMake = await carMake.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec()
    res.json(CarMake)
}

exports.update = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }
        const updated = await carMake.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Car Make updated failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await carMake.findOneAndDelete({ slug: req.params.slug })
        res.json(deleted)
    }
    catch (err) {
        return res.status(400).send("Car Make deleted failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await carMake.findOneAndUpdate(
            { slug: req.params.slug },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Make deleted failed")
    }
}

exports.count = async (req, res) => {
    let total = await carMake.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const CarMake = await carMake.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(CarMake)
    }
    catch (err) {
        res.status(400).send("Car Make pagination failed")
    }
}

exports.list = async (req, res) => {
    let carMakes = await carMake.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(carMakes)
}