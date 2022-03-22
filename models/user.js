const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: String,
        rut: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            index: true,
        },
        phone: Number,
        address: String,
        role: {
            type: String,
            enum: ["Admin", "Client", "Employee"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
