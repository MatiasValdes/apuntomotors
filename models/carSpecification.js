const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const carSpecificationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required",
            trim: true,
            maxlength: 100,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        parent: {
            type: ObjectId,
            ref: "carSpecification",
        },
        carType: {
            type: ObjectId,
            required: "Type is required",
            ref: "carType",
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"],
        },
    },
    { timestamp: true }
)

module.exports = mongoose.model("carSpecification", carSpecificationSchema)