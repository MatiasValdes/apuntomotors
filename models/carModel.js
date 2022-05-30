const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const carModelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required",
            trim: true,
            maxlength: 32,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        carMake: {
            type: ObjectId,
            required: "Make is required",
            ref: "carMake",
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

module.exports = mongoose.model("carModel", carModelSchema)