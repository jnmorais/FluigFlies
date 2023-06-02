module.exports = app => {
    const sod = require("../controllers/sod.controller");
    app.post("/sod", sod.create);
};