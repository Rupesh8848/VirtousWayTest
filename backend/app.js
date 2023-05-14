const express = require("express");
const userRoute = require("./Route/userRoute");
const validateUser = require("./validateUser");
const noteRoute = require("./Route/noteRoute");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/note", validateUser, noteRoute);

module.exports = app;
