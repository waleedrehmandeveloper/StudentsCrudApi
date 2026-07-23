const mongoose = require("mongoose");
const { type } = require("node:os");

const stdmodel = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    fathername:{
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    studentemail: {
        type: String,
        unique: true,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("studentmanagment",stdmodel);
