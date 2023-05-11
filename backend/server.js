const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config({});

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connected to database.");
    server.listen(process.env.PORT, () => {
      console.log(`Server started and listening at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database.", error);
  });
