
$(document).ready(function () {

    $(document).on("click", "a.purchase", handlePurchase);


    getProducts();

    const cartObject = {};

    function getProducts() {
        $.get("/api/products", function (data) {
            console.log("Products", data)
            let cart = localStorage.getItem("cartItems");
            cart = cart.split(",");
            cartQty(cart);
            buildCart(data, cart, cartObject)



        })
    };

    const total = [];

    function buildCart(data, cart, cartObject) {
        console.log(data);
        console.log(cartObject);
        const uniqueCart = new Set(cart);
        const newCart = [...uniqueCart];
        const purchaseButton = `<a class="btn btn-light purchase" id="purchaseButton">Purchase</a>`;
        $("#purchaseCol").append(purchaseButton);


        for (let i = 0; i < newCart.length; i++) {
            const prodDiv = `<div class="col-4">${data[cartObject[newCart[i]]]["product_name"]}</div>`;
            const qtyDiv = `<div class="col-2">${cartObject[newCart[i]]}</div>`;
            const priceDiv = `<div class="col-3">$${data[newCart[i]]["price"]}</div>`;
            let extPrice = data[newCart[i]]["price"] * cartObject[newCart[i]];
            const extPriceDiv = `<div class="col-3">$${extPrice}</div>`;
            total.push(extPrice);


            $("#cartRow").append(prodDiv);
            $("#cartRow").append(qtyDiv);
            $("#cartRow").append(priceDiv);
            $("#cartRow").append(extPriceDiv);



        }

        console.log(total);


        let finalTotal = total.reduce(function (acc, amount) {
            return acc + amount
        });

        console.log(finalTotal);
        const totalDiv = `<div class="col-3">$${finalTotal}</div>`;


        $("#totalCol").append(totalDiv);



    };





    function cartQty(cart) {

        cart.forEach(function (item) {
            if (!cartObject[item])
                cartObject[item] = 0;
            cartObject[item] += 1;
        })

    }


    const cartArray = [
        {
            id: 5,
            stock_quantity: 88
        },

        {
            id: 2,
            stock_quantity: 77


        }
     


    ];


    const testObject = {
        id: 5,
        stock_quantity: 7

    }

    function handlePurchase(req, res) {
        $.ajax({
            method: "PUT",
            url: "/api/products",
            dataType: "json",
            data: {cart: cartArray}

        })
            .then(function (res) {
                console.log(res)
            });


    };






});
