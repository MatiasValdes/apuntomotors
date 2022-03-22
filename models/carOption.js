const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const carOptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlegth: 32
        },
        carOption: {
            type: ObjectId,
            ref: "CarOption"
        },
        cartype: {
            type: ObjectId,
            ref: "carType"
        },
    },
    { timestamp: true }
);

module.exports = mongoose.module("carOption", carOptionSchema);