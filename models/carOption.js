const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const carOptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required",
            trim: true,
            maxlength: 32
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        parent: {
            type: ObjectId,
            required: "Parent is required",
            ref: "CarOption"
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

module.exports = mongoose.model("carOption", carOptionSchema)