const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const carSpecificationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlegth: 32,
        },
        parent: {
            type: ObjectId,
            ref: "carSpecification",
        },
        carType: {
            type: ObjectId,
            ref: "carType",
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("carSpecification", carSpecificationSchema);