const db = require("../models");

const items = [
    {
        product_name: "Classic Whole Bean",
        department_name: "Coffee",
        price: 12.00,
        stock_quantity: 5,
        image: "classicWholeBean",
        createdAt: null,
        updatedAt: null
    },
    {
        product_name: "Classic Roast Espresso",
        department_name: "Coffee",
        price: 15.00,
        stock_quantity: 5,
        image: "classicEspresso",
        createdAt: null,
        updatedAt: null

    },
    {
        product_name: "Dark Roast Espresso",
        department_name: "Coffee",
        price: 15.00,
        stock_quantity: 5,
        image: "darkEspresso",
        createdAt: null,
        updatedAt: null

    },
    {
        product_name: "Dark Roast Ground",
        department_name: "Coffee",
        price: 14.00,
        stock_quantity: 5,
        image: "darkGround",
        createdAt: null,
        updatedAt: null

    },
    {
        product_name: "Dark Roast Whole Bean",
        department_name: "Coffee",
        price: 12.00,
        stock_quantity: 5,
        image: "darkWholeBean",
        createdAt: null,
        updatedAt: null

    },
    {
        product_name: "Medium Roast Espresso",
        department_name: "Coffee",
        price: 15.00,
        stock_quantity: 5,
        image: "mediumEspresso",
        createdAt: null,
        updatedAt: null

    },
    {
        product_name: "Medium Roast Ground",
        department_name: "Coffee",
        price: 15.00,
        stock_quantity: 5,
        image: "mediumGround",
        createdAt: null,
        updatedAt: null

    },
    {
        product_name: "Medium Ground Decaf",
        department_name: "Coffee",
        price: 16.00,
        stock_quantity: 5,
        image: "mediumGroundDecaf",
        createdAt: null,
        updatedAt: null

    }


];

db.sequelize.sync({ force: true}).then(function () {
    db.Product.bulkCreate(items).then(function (rows) {
        console.log(`\n${rows.length} Rows Inserted`);

    })
    .catch(function(err) {
        console.log(`\nError:`, err);
    });
});
