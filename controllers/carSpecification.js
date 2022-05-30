const carSpecification = require("../models/carSpecification")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const { name, parent, cartype } = req.body
        res.json(await new carSpecification({ name, slug: slugify(name), parent, carType }).save())
    }
    catch (err) {
        res.status(400).send("Create Car Specificaction failed")
    }
}

exports.read = async (req, res) => {
    const CarSpecification = await carSpecification.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec()
    res.json(CarSpecification)
}

exports.update = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }

        const updated = await carSpecification.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Car Specification updated failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await carSpecification.findOneAndDelete({
            slug: req.params.slug
        })
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Specification deleted failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await carSpecification.findOneAndUpdate(
            { slug: req.params.slug },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Car Specification deleted failed")
    }
}

exports.count = async (req, res) => {
    let total = await carSpecification.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const CarSpecification = await carSpecification.find({ status: "Active" }
            .skip((currentPage - 1) * perPage))
            .sort([[sortm, order]])
            .limit(perPage)
            .exec()

        res.json(CarSpecification)
    }
    catch (err) {
        res.status(400).send("Car Specification pagination failed")
    }
}

exports.list = async (req, res) => {
    let carSpecifications = await carSpecification.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(carSpecifications)
}