const express = require("express");
const server = express();
const PORT = process.env.PORT || 8000;
const path = require("node:path");

const { homeRouter } = require("./routes/homeRouter");

//app-level middleware
server.use(express.json());
server.use(express.urlencoded({extended: false}));

// static folder
server.use(express.static(path.join(__dirname, "public")));

// setup ejs
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

// Routes
server.use("/", homeRouter);

// Error handling
server.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

server.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({ msg: err.message });
    } else {
        res.status(500).json({ msg: err.message });
    }
})

// server will listen on port
server.listen(PORT, () => { console.log(`Server is listening on port ${PORT}`) });
