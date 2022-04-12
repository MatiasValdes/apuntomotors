const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userCarSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
        },
        carType: {
            type: ObjectId,
            ref: "carType",
        },
        carMake: {
            type: ObjectId,
            ref: "carMake",
        },
        carModel: {
            type: ObjectId,
            ref: "carModel",
        },
        carGeneration: {
            type: ObjectId,
            ref: "carGeneration"
        },
        carSerie: {
            type: ObjectId,
            ref: "carSerie",
        },
        carTrim: {
            type: ObjectId,
            ref: "carTrim",
        },
        carEquipment: {
            type: ObjectId,
            ref: "carEquipment"
        }
    }
);

module.exports = mongoose.model("userCar", userCarSchema);