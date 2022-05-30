const mongoose = require("mongoose")

const connectBD = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CLOUD,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("BD CONNECTED")
    }
    catch(err) {
        console.log("BD CONNECTED ERROR: ", err)
        process.exit(1)
    }
}

module.exports = connectBD