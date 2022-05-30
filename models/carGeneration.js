const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const carGenerationSchema = new mongoose.Schema(
    {
        carModel: {
            type: ObjectId,
            required: "Model is required",
            ref: "carModel"
        },
        name: {
            type: String,
            required: "Name is required",
            trim: true,
            maxLength: 200,
        },
        yearBegin: {
            type: Date,
        },
        yearEnd: {
            type: Date,
        },
        cartype: {
            type: ObjectId,
            required: "Type is required",
            ref: "carType"
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"],
        }
    },
    { timestamp: true }
)

module.exports = mongoose.model("carGeneration", carGenerationSchema)