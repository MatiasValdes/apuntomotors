const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const comunaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Name is required",
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
        },
        region: {
            type: ObjectId,
            required: "Region is required",
            ref: "Region",
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Comuna", comunaSchema)