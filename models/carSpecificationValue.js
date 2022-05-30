const mongoose = require("mongoose")
const { ObjectId } = require("mongoose")

const carSpecificationValueSchema = new mongoose.Schema(
    {
        carTrim: {
            type: ObjectId,
            required: "Trim is required",
            ref: "carTrim"
        },
        carSpecification: {
            type: ObjectId,
            required: "Specification is required",
            ref: "carSpecification"
        },
        value: {
            type: String,
            required: "Value is required",
            trim: true,
            maxlength: 100,
        },
        unit: {
            type: String,
            trim: true,
            maxlength: 10,
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

module.exports = mongoose.model("carSpecificationValue", carSpecificationValueSchema)