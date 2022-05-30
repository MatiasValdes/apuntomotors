const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const carEquipmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required",
            trim: true,
            maxlength: 300
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        year: {
            type: Number,
            required: "Year is required",
        },
        carTrim: {
            type: ObjectId,
            required: "Trim is required",
            ref: "carTrim"
        },
        cartype: {
            type: ObjectId,
            required: "type is required",
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

module.exports = mongoose.model("carEquipment", carEquipmentSchema)