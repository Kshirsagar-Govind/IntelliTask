const express = require("express");
const server = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const Router = require('./Routes/user-route')
dotenv.config();

var distDir = __dirname + "/";
mongoose.connect(
    process.env.DATABASE_ACCESS,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => console.log("+ DATABASE CONNECTED SUCCESSFULLY")
);
server.use(helmet());
server.use(express.json());
server.use(express.static(distDir));
server.use(cors());
server.use(Router);
server.listen(PORT, () => console.log(`+ SERVER IS LIVE ON PORT ${PORT}`))