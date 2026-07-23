const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Db connected successfully")
    } catch (error) {
        console.error("Db is not connected")
    }
} 

module.exports = connectDb;