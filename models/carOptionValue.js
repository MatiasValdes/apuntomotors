const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const carOptionValueSchema = new mongoose.Schema(
    {
        carOption: {
            type: ObjectId,
            ref: "carOption"
        },
        carEquipment: {
            type: ObjectId,
            ref: "carEquipment"
        },
        isBase: Number,
        cartype: {
            type: ObjectId,
            ref: "carType"
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("carOptionValue", carOptionValueSchema);