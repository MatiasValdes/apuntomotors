const mongoose = require("mongoose")
const { ObjectId } = require("mongoose")

const carMakeSchema = new mongoose.Schema(
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
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"],
        },
        cartype: {
            type: ObjectId,
            required: "Type is required",
            ref: "carType"
        },
    },
    { timestamp: true }
)

module.exports = mongoose.model("carMake", carMakeSchema)