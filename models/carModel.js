const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const carModelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlegth: 32,
        },
        carMake: {
            type: ObjectId,
            ref: "carMake",
        },
        carType: {
            type: ObjectId,
            ref: "carType",
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("carModel", carModelSchema);