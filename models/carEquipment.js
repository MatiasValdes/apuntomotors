const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const carEquipmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlegth: 32
        },
        parent: {
            type: ObjectId,
            ref: "carEquipment"
        },
        cartype: {
            type: ObjectId,
            ref: "carType"
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("carEquipment", carEquipmentSchema);