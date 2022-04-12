const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const carSerieSchema = new mongoose.Schema(
    {
        carModel: {
            type: ObjectId,
            ref: "carModel"
        },
        carGeneration: {
            type: ObjectId,
            ref: "Generation"
        },
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

module.exports = mongoose.model("carSerie", carSerieSchema);