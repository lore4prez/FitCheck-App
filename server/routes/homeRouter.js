const { Router } = require("express");
const homeRouter = Router();

homeRouter.use("/", (req, res, next) => {
    res.json({ check: "Initial test is success" });
})

module.exports = { homeRouter }