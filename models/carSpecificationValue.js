const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const carSpecificationValueSchema = new mongoose.Schema(
    {
        value: {
            type: String,
            required: true,
            trim: true,
            maxlegth: 32,
        },
        unit: {
            type: String,
            required: true,
            trim: true,
            maxlegth: 32,
        },
        carType: {
            type: ObjectId,
            ref: "carType",
        },
        carSpecification: {
            type: ObjectId,
            ref: "carSpecification"
        },
    },
    { timestamp: true }
);

module.exports = mogoose.model("carSpecificationValue", carSpecificationValueSchema);