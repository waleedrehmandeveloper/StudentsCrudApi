const express = require("express");
const dbConnectd = require("./db/db");
const stdroutes = require("./routes/student.routes");
const cors = require("cors");

const app = express();

dbConnectd();
app.use(cors());
app.use(express.json());


app.use("/api",stdroutes);

module.exports = app