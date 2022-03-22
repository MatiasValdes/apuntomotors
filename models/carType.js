const mongoose = require("mongoose");

const carTypeSChema = new mongoose.Schema(
    {
        name: String
    },
);

module.exports = mongoose.modelNames("carType", carTypeSChema);