const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const carOptionValueSchema = new mongoose.Schema(
    {
        carOption: {
            type: ObjectId,
            required: "Option is required",
            ref: "carOption"
        },
        carEquipment: {
            type: ObjectId,
            required: "Equipment is required",
            ref: "carEquipment"
        },
        isBase: {
            type: Number,
            default: 1
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
        }
    },
    { timestamp: true }
)

module.exports = mongoose.model("carOptionValue", carOptionValueSchema)