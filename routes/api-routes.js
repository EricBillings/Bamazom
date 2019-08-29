const db = require("../models");

module.exports = function (app) {


    app.get("/api/products", function (req, res) {
        db.Product.findAll({}).then(function (dbProduct) {
            res.json(dbProduct);

        });

    });

    app.get("/api/products/:id", function(req, res) {
        db.Product.findOne({
          where: {
            id: req.params.id
          }
        }).then(function() {
          console.log(res);
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
        req.body.cart.forEach(function(item) {
            db.Product.update({
                stock_quantity: item.stock_quantity
            }, {
                    where: {
                        id: item.id
                    }
                })
        })
    });

};