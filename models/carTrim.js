const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const carTrimSchema = new mongoose.Schema(
    {
        carSerie: {
            type: ObjectId,
            required: "Serie is required",
            ref: "carSerie"
        },
        carModel: {
            type: ObjectId,
            required: "Model is required",
            ref: "carModel"
        },
        name: {
            type: String,
            required: "Name is required",
            trim: true,
            maxlength: 50
        },
        starProductionYear: Number,
        endProductionYear: Number,
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

module.exports = mongoose.model("carTrim", carTrimSchema)