///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");


///////////////////////////////

///////////////////////////////
///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));
///////////////////////////////
// MODELS
////////////////////////////////
const PlayerSchema = new mongoose.Schema({
    name: String,
    position: String,
    image: String,

});

const Player = mongoose.model("Player", PlayerSchema);

// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.urlencoded({ extended: false })); app.use(express.json()); // parse json bodies

// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});
// Player INDEX ROUTE
app.get("/player", async (req, res) => {
    try {
        // send all player
        res.json(await Player.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Player CREATE ROUTE
app.post("/player", async (req, res) => {
    try {
        // send all player
        res.json(await Player.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});
// Player DELETE ROUTE
app.delete("/player/:id", async (req, res) => {
    try {
        // send all player
        res.json(await Player.findByIdAndRemove(req.params.id));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Player UPDATE ROUTE
app.put("/player/:id", async (req, res) => {
    try {
        // send all player
        res.json(
            await Player.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});


// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));