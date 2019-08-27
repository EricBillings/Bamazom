$(document).ready(function () {

    getProducts();


    function getProducts() {
        $.get("/api/products", function (data) {
            console.log("Products", data)
            buildRows(data);

        });

    };


    function buildRows(data) {
        for (let i = 0; i < data.length; i++) {
            const newCard = $(`<div class="card" id="card${data[i]}" style="width: 18rem;">
            <img src="./images/mediumEspresso.jpg" class="card-img-top" alt="Classic Espresso">
            <div class="card-body">
            <h5 class="card-title">${data[i]["product_name"]}</h5>
            <p class="card-text">$${data[i]["price"]}</p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
            </div>
            </div>`)
            

            $("#middleContainer").prepend(newCard);

        }

    }

























});

