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
    console.log("Connected to database")

    // Configure cors to accept every connection
    app.use(cors({
        origin: "*"
    }))

    // Route traffic to router
    app.use(require("./routes"));

    server.listen(process.env.PORT, () => {
        console.log("Server is ready for requests")
    });
}

init();