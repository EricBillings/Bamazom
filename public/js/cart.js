
$(document).ready(function () {

    $(document).on("click", "a.purchase", handlePurchase);


    getProducts();

    const cartObject = {};
    let dataHold;


    function getProducts() {
        $.get("/api/products", function (data) {
            console.log("Products", data)
            let cart = localStorage.getItem("cartItems");
            cart = cart.split(",");
            cartQty(cart);
            buildCart(data, cart, cartObject)
            dataHold = data;


        })
    };



    const total = [];

    function buildCart(data, cart, cartObject) {
        const uniqueCart = new Set(cart);
        const newCart = [...uniqueCart];
        const purchaseButton = `<a class="btn btn-light purchase" id="purchaseButton">Purchase</a>`;
        $("#purchaseCol").append(purchaseButton);


        for (let i = 0; i < newCart.length; i++) {
            let prodDiv;
            let dataPosition = newCart[i] - 1;
            console.log(cartObject);
            console.log(newCart[i]);
            console.log(data[dataPosition]);
            if (cartObject[newCart[i]] > data[dataPosition]["stockQuantity"]) {
                prodDiv = `<div>Sorry, not enough stock for your order</div>`;
                $("#cartRow").append(prodDiv);

            } else {

                prodDiv = `<div class="col-4">${data[dataPosition]["product_name"]}</div>`;
                const qtyDiv = `<div class="col-2">${cartObject[newCart[i]]}</div>`;
                const priceDiv = `<div class="col-3">$${data[dataPosition]["price"]}</div>`;
                let extPrice = data[dataPosition]["price"] * cartObject[newCart[i]];
                const extPriceDiv = `<div class="col-3">$${extPrice}</div>`;
                total.push(extPrice);
            


            $("#cartRow").append(prodDiv);
            $("#cartRow").append(qtyDiv);
            $("#cartRow").append(priceDiv);
            $("#cartRow").append(extPriceDiv);
            }
        }


        let finalTotal = total.reduce(function (acc, amount) {
            return acc + amount
        });

        const totalDiv = `<div class="col-3">$${finalTotal}</div>`;


        $("#totalCol").append(totalDiv);



    };





    function cartQty(cart) {
        console.log(cart);

        cart.forEach(function (item) {
            if (!cartObject[item])
                cartObject[item] = 0;
            cartObject[item] += 1;
        })

    };


    const cartArray = [
    ];



    function handlePurchase(req, res) {
        let cartItems = Object.keys(cartObject);

        console.log(cartItems);
        for (let i = 0; i < cartItems.length; i++) {
            let cartItem = {};
            cartItem.id = cartItems[i];
            console.log(cartItem);
            cartArray.push(cartItem);
            console.log(dataHold);
            console.log(cartItems[i]);
            let j = i;
            console.log(dataHold[j]);
            let stockQuantity = dataHold[j]["stock_quantity"];
            console.log(stockQuantity);
            cartItem.stock_quantity = stockQuantity - cartObject[cartItems[i]];

        }



        $.ajax({
            method: "PUT",
            url: "/api/products",
            dataType: "json",
            data: { cart: cartArray }

        })
            .then(function (res) {
                console.log(res)
            });


    };






});
