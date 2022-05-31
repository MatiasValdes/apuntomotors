const Comuna = require("../models/comuna")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const { name, region } = req.body
        res.json(await new Comuna({ name, slug: slugify(name), region }).save())
    }
    catch (err) {
        res.status(400).send("Comuna create failed")
    }
}

exports.read = async (req, res) => {
    const comuna = await Comuna.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec()
    res.json(comuna)
}

exports.update = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }
        const updated = await Comuna.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Comuna update failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Comuna.findOneAndDelete(
            { slug: req.params.slug }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Comuna delete failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await Comuna.findOneAndUpdate(
            { slug: req.params.slug },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Comuna delete failed")
    }
}

exports.count = async (req, res) => {
    let total = await Comuna.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const comuna = await Comuna.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(comuna)
    }
    catch (err) {
        res.status(400).send("Comuna pagination failed")
    }
}

exports.list = async (req, res) => {
    let comunas = await Comuna.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(comunas)
}