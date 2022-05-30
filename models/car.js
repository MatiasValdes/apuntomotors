const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const carSchema = new mongoose.Schema(
    {
        carMake: {
            type: ObjectId,
            required: "Make is required",
            ref: "carMake"
        },
        carModel: {
            type: ObjectId,
            required: "Model is required",
            ref: "carModel"
        },
        carSerie: {
            type: ObjectId,
            required: "Serie is required",
            ref: "carSerie"
        },
        carTrim: {
            type: ObjectId,
            required: "Trim is required",
            ref: "carTrim"
        },
        carType: {
            type: ObjectId,
            required: "Type is required",
            ref: "carType"
        },
        client: {
            type: ObjectId,
            required: "Client is required",
            ref: "User"
        },
        patent: {
            type: String,
            unique: true,
            minlength: 6,
            maxlength: 6,
            required: "Patent is required",
            trim: true,
        },
        comment: {
            type: String,
            maxlength: 2000
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"],
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Car", carSchema)