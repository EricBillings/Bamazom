
$(document).ready(function () {

    $(document).on("click", "a.purchase", handlePurchase);


    getProducts();

    const cartObject = {};
    let dataHold;

    /* Gets data from database*/
    function getProducts() {
        $.get("/api/products", function (data) {
            let cart = localStorage.getItem("cartItems");
            cart = cart.split(",");
            cartQty(cart);
            buildCart(data, cart, cartObject)
            dataHold = data;


        })
    };



    const total = [];
    const homeButton = `<a href="/" class="btn btn-light home" style="margin: 5px" id="home">Back to Shopping</a>`;


    /* Builds cart HTML*/
    function buildCart(data, cart, cartObject) {
        const uniqueCart = new Set(cart);
        const newCart = [...uniqueCart];
        const purchaseButton = `<a class="btn btn-light purchase" id="purchaseButton">Purchase</a>`;
        $("#purchaseCol").append(purchaseButton);

        /* Compares cart quantity to stock quantity and allows or stops transaction*/
        for (let i = 0; i < newCart.length; i++) {
            let prodDiv;
            let dataPosition = newCart[i] - 1;
            console.log(dataPosition);
            console.log(cartObject[newCart[i]]);
            if (cartObject[newCart[i]] > data[dataPosition]["stock_quantity"]) {
                prodDiv = `<div>Sorry, not enough stock for your order</div>`;


                $("#cartRow").append(prodDiv);
                $("#totalCol").append(homeButton);
                $("#purchaseButton").hide();

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

        /* Builds total purchase amount */
        let finalTotal = total.reduce(function (acc, amount) {
            return acc + amount
        });

        const totalDiv = `<div class="col-3">$${finalTotal}</div>`;


        $("#totalCol").append(totalDiv);



    };

    /* Builds object to hold unique cart items with quantity in cart*/
    function cartQty(cart) {

        cart.forEach(function (item) {
            if (!cartObject[item])
                cartObject[item] = 0;
            cartObject[item] += 1;
        })

    };


    const cartArray = [
    ];


    /* Builds individual cart items into objects for PUT request */
    function handlePurchase(req, res) {
        let cartItems = Object.keys(cartObject);

        for (let i = 0; i < cartItems.length; i++) {
            let cartItem = {};
            cartItem.id = cartItems[i];
            let stockQuantity = dataHold[i]["stock_quantity"];
            cartItem.stock_quantity = stockQuantity - cartObject[cartItems[i]];
            console.log(stockQuantity);
            console.log(cartObject[cartItems[i]]);
            cartArray.push(cartItem);
            
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
            
            localStorage.removeItem("cartItems");
            
            const thanksDiv = `<div>Thank you for your purchase!</div>`
            $("#totalCol").append(thanksDiv);
            $("#totalCol").append(homeButton);
            $("#purchaseButton").hide();
            

            return

    };


});
