$(document).ready(function () {

    getProducts();


    function getProducts() {
        $.get("/api/products", function (data) {
            console.log("Products", data)
            buildCards(data);



        })
    };


    function buildCards(data) {
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





});
















