const db = require("../models");

module.exports = function (app) {


    app.get("/api/products", function (req, res) {
        db.Product.findAll({}).then(function (dbProduct) {
            res.json(dbProduct);

        });

    });

    app.post("/api/products", function (req, res) {
        db.Product.create({
            product_name: req.body.product_name,
            department_name: req.body.department_name,
            price: req.body.price,
            stock_quantity: req.body.stock_quantity
        }).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });

    app.delete("/api/products/:id", function (req, res) {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.json({ message: "destroyed" });

        });

    });

    app.put("/api/products", function (req, res) {
        console.log('***',req.body)
        let dbProducts;
        req.body.cart.forEach(el => {
                    db.Product.update({
                stock_quantity: el.stock_quantity
        }, {
                where: {
                    id: el.id
                }
            })
            .then(function (dbProduct) {
                dbProducts = dbProduct
            });
        })
        res.json(dbProducts);
    });

};