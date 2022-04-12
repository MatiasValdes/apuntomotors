const mongoose = require("mongoose")
const { ObjectId } = require("mongoose")

const carMakeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlegth: 32
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
            ref: "carType"
        },
    },
    { timestamp: true }
)

module.exports = mongoose.model("carMake", carMakeSchema)