const Region = require("../models/region")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const { name } = req.body
        res.json(await new Region({ name, slug: slugify(name) }).save())
    }
    catch (err) {
        res.status(400).send("Region create failed")
    }
}

exports.read = async (req, res) => {
    const region = await Region.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec()
    res.json(region)
}

exports.update = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }
        const updated = await Region.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Region update failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Region.findOneAndDelete(
            { slug: req.params.slug }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Region delete failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await Region.findOneAndUpdate(
            { slug: req.params.slug },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Region delete failed")
    }
}

exports.count = async (req, res) => {
    let total = await Region.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const region = await Region.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(region)
    }
    catch (err) {
        res.status(400).send("Region pagination failed")
    }
}

exports.list = async (req, res) => {
    let regions = await Region.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(regions)
}