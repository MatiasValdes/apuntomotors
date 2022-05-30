const carType = require("../models/carType")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const { name } = req.body
        res.json(await new carType({ name, slug: slugify(name) }).save())
    }
    catch (err) {
        res.status(400).send("Create Car Type failed")
    }
}

exports.read = async (req, res) => {
    let read = await carType.findOne({ slug: req.params.slug, status: "Active" }).exec()
    res.json(read)
}

exports.update = async (req, res) => {
    const { name } = req.body
    try {
        const update = await carType.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        )
        res.json(update)
    }
    catch (err) {
        res.status(400).send("Car Type update failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await carType.findOneAndUpdate(
            { slug: req.params.slug },
            { status: "Inactive" },
            { new: true }
        )
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Type delete failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await carType.findOneAndDelete({ slug: req.params.slug })
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Type delete failed")
    }
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const carTypes = await carType.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(carTypes)
    }
    catch (err) {
        res.status(400).send("Car Type pagination failed")
    }
}

exports.list = async (req, res) => {
    let carTypes = await carType.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(carTypes)
}