const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required",
            maxlenght: 100,
        },
        rut: {
            type: String,
            required: "Rut is required",
            maxlenght: 100,
            index: true,
        },
        email: {
            type: String,
            required: "Email is required",
            index: true,
            maxlenght: 100,
            unique: true,
        },
        phone: {
            type: Number,
            required: "Phone is required",
        },
        address: {
            type: String,
            required: "Address is required",
            maxlenght: 100,
        },
        comuna: {
            type: ObjectId,
            required: "Comuna is required",
            ref: "Comuna",
        },
        role: {
            type: String,
            enum: ["Admin", "Client", "Employee"],
            required: "Role is required"
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
