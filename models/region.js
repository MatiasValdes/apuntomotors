const mongoose = require("mongoose")

const regionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Namee is required",
            maxlength: 32,
            text: true,
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
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Region", regionSchema)