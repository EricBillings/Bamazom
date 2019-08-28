$(document).ready(function () {

    getProducts();

    let dataHold;

    function getProducts() {
        $.get("/api/products", function (data) {
            console.log("Products", data)
            holdData(data);
            buildRows(data);
            


        })
    };


    function buildRows(data) {
        for (let i = 0; i < data.length; i++) {
            const newCard = $(`<div class="card" id="card${data[i]}" style="width: 18rem;">
            <img src="./images/${data[i]["image"]}.jpg" class="card-img-top" alt="${data[i]["image"]}">
            <div class="card-body">
            <h5 class="card-title">${data[i]["product_name"]}</h5>
            <p class="card-text">$${data[i]["price"]}</p>
            <a href="#" class="btn btn-primary cartButton" id="${data[i]["id"]}">Add to Cart</a>
            </div>
            </div>`)


            $("#middleContainer").append(newCard);

        }

    }

    let cart = [];
    $("#middleContainer").on("click", ".cartButton", function () {
        event.preventDefault();
        cart.push(this.id);
        localStorage.setItem("cartItems", cart)
        console.log(cart);
    });


    $("#checkout").on("click", function () {
        $(document).ready(function () {
            buildCart(dataHold);
        })
    });



    function buildCart(dataHold) {
        console.log(dataHold)
        convertCart();
        console.log(cart);
        for (let i = 0; i < cart.length; i++) {
            const prodDiv = `<div class="col-4">${dataHold[cart[i]]["product_name"]}</div>`;
            const qtyDiv = `<div class="col-2">${dataHold[cart[i]]["stock_quantity"]}</div>`;
            const priceDiv = `<div class="col-3">$${dataHold[cart[i]]["price"]}</div>`;

            $("#cartRow").append(prodDiv);
            $("#cartRow").append(qtyDiv);
            $("#cartRow").append(priceDiv);


        }

    };


    function convertCart() {
        cart = cart.map(Number);
        cart = cart.map(function (item) {
            return item -= 1;
        });

    };

    function holdData (data) {
        dataHold = data;
        console.log(dataHold);
    }


});
















