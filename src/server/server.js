require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const allRouter = require("./controllers");
const sequelize = require("./config/connection");

// Requiring models requires all databases which causes Init to be called and initialize all databases - just in case?
require("./models");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "client")));
// json body parser so that we can use req.body
app.use(express.json());
// used in middleware to grab the user token
app.use(cookieParser());
app.use(allRouter);

// This says wait until all the other stuff is done before starting the server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
});