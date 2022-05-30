const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema(
    {
        orderStatus: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Processing",
                "Completed",
                "Delivered",
                "Canceled"
            ],
        },
        car: {
            type: ObjectId,
            required: "Car is required",
            ref: "Car"
        },
        images: [{
            type: Array,
        }],
        comments: {
            type: String,
            maxlength: 2000
        },
        dateInit: {
            type: Date,
            required: "Date Init is required",
        },
        dateEnd: {
            type: Date,
            required: "Date End is required",
        },
        assignedFor: {
            type: ObjectId,
            required: "Assigned For is required",
            ref: "User"
        },
        service:[
            {
                type: ObjectId,
                ref: "Service",
                required: "Service is required"
            }
        ],
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema)