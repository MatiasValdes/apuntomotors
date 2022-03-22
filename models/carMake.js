const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const carMakeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlegth: 32
        },
        cartype: {
            type: ObjectId,
            ref: "carType"
        },
    },
    { timestamp: true }
);

module.exports = mongoose.module("carMake", carMakeSchema);