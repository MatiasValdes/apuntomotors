const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const carTrimSchema = new mongoose.Schema(
    {
        carSerie: {
            type: ObjectId,
            ref: "carSerie"
        },
        carModel: {
            type: ObjectId,
            ref: "carModel"
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlegth: 32
        },
        starProductionYear: Number,
        endProductionYear: Number,
        cartype: {
            type: ObjectId,
            ref: "carType"
        },
    },
    { timestamp: true }
);

module.exports = mongoose.module("carTrim", carTrimSchema);