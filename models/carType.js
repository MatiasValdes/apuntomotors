const mongoose = require("mongoose")

const carTypeSChema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Name is required",
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
    },
    { timestamps: true }
)

module.exports = mongoose.model("carType", carTypeSChema)