const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const carGenerationSchema = new mongoose.Schema(
    {
        carModel: {
            type: ObjectId,
            ref: "carModel"
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 32,
        },
        yearBegin: Date,
        yearEnd: Date,
        cartype: {
            type: ObjectId,
            ref: "carType"
        },
    },
    { timestamp: true }
);

module.exports = mongoose.module("carGeneration", carGenerationSchema);