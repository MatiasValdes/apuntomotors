const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Name is required",
            maxlength: 50,
            text: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: "Description is required",
            maxlength: 2000,
        },
        price: {
            type: Number,
            required: "Price is required",
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"],
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Service", serviceSchema)