const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const carSerieSchema = new mongoose.Schema(
    {
        carModel: {
            type: ObjectId,
            required: "Model is required",
            ref: "carModel"
        },
        carGeneration: {
            type: ObjectId,
            required: "Generation is required",
            ref: "carGeneration"
        },
        name: {
            type: String,
            required: "Name is required",
            trim: true,
            maxlength: 100
        },
        carType: {
            type: ObjectId,
            required: "Type is required",
            ref: "carType"
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"],
        },
    },
    { timestamp: true }
)

module.exports = mongoose.model("carSerie", carSerieSchema)