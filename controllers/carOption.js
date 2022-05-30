const carOption = require("../models/carOption")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const { name, parent, cartype } = req.body
        res.json(await new carOption({ name, slug: slugify(name), parent, carType }).save())
    }
    catch (err) {
        res.status(400).send("Create Car Option failed")
    }
}

exports.read = async (req, res) => {
    const CarOption = await carOption.finOne({
        slug: req.params.slug,
        status: "Active"
    }).exec()
    res.json(CarOption)
}

exports.update = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }

        const updated = await carOption.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Car Options updated failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await carOption.findOneAndDelete({
            slug: req.params.slug
        })
        res.json(deleted)
    }
    catch (err) {
        return res.status(400).send("Car Option deleted failed")
    }
}

exports.removeSoft = async (res, req) => {
    try {
        const deleted = await carOption.findOneAndUpdate(
            { slug: req.params.slug },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Option deleted failed")
    }
}

exports.count = async (res, req) => {
    let total = await carOption.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (res, req) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const CarOption = await carOption.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(CarOption)
    }
    catch (err) {
        res.status(400).send("Car Option pagination failed")
    }
}

exports.list = async (req, res) => {
    let carOptions = await carOption.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(carOptions)
}