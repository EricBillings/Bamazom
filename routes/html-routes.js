const path = require("path");

module.exports = function (app) {
    app.get("/cart", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/cart.html"));

    });
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index"));

    });

    




};