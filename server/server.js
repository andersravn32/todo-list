const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./utilities/database");

// Async init method, for creating initial database connection
const init = async () => {
  // Configure environment varibles
  dotenv.config();

  // Create database connection pool
  database.connect();
  console.log("Connected to database");

  // Configure morgan as default HTTP logger
  app.use(require("morgan")("dev"));

  // Configure cors to accept every connection
  app.use(
    cors({
      origin: "*",
    })
  );

  // Configure express body parser
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use(express.json());

  // Route traffic to router
  app.use(require("./routes"));

  server.listen(process.env.PORT, () => {
    console.log("Server is ready for requests");
  });
};

init();
