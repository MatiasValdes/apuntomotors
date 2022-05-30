const Service = require("../models/service")
const slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        const { name, description, price } = req.body
        res.json(await new Service({ name, slug: slugify(name), description, price }).save())
    }
    catch (err) {
        res.status(400).send("Service create failed")
    }
}

exports.read = async (req, res) => {
    const service = await Service.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec()
    res.json(service)
}

exports.update = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }
        const updated = await Service.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec()
        res.json(updated)
    }
    catch (err) {
        res.status(400).send("Service update failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Service.findOneAndDelete(
            { slug: req.params.slug }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Service delete failed")
    }
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await Service.findOneAndUpdate(
            { slug: req.para.slug },
            { status: "Inactive" },
            { new: true }
        ).exec()
        res.json(deleted)
    }
    catch (err) {
        res.status(400).send("Service delete failed")
    }
}

exports.count = async (req, res) => {
    let total = await Service.find({ status: "Active" })
        .estimatedDocumentCount()
        .exec()
    res.json(total)
}

exports.pagination = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page | 1
        const perPage = 6

        const service = await Service.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json(service)
    }
    catch (err) {
        res.status(400).send("Service pagination failed")
    }
}

exports.list = async (req, res) => {
    let services = await Service.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createAt", "desc"]])
        .exec()
    res.json(services)
}