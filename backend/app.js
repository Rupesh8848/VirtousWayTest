const express = require("express");
const userRoute = require("./Route/userRoute");
const validateUser = require("./validateUser");
const noteRoute = require("./Route/noteRoute");

const app = express();

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/note", validateUser, noteRoute);

module.exports = app;
