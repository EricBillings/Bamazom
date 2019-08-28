
$(document).ready(function () {

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
    
    
    function buildCart(data, cart, cartObject) {
        console.log(data);
        console.log(cartObject);
        const uniqueCart = new Set(cart);
        const newCart = [...uniqueCart];
        for (let i = 0; i < newCart.length; i++) {
            const prodDiv = `<div class="col-4">${data[cartObject[newCart[i]]]["product_name"]}</div>`;
            const qtyDiv = `<div class="col-2">${cartObject[newCart[i]]}</div>`;
            const priceDiv = `<div class="col-3">$${data[newCart[i]]["price"]}</div>`;
            let extPrice = data[newCart[i]]["price"] * cartObject[newCart[i]];
            const extPriceDiv = `<div class="col-3">$${extPrice}</div>`;
            $("#cartRow").append(prodDiv);
            $("#cartRow").append(qtyDiv);
            $("#cartRow").append(priceDiv);
            $("#cartRow").append(extPriceDiv);
            
        }  
        
        const purchaseButton =  `<a class="btn btn-light" id="purchaseButton">Purchase</a>`;

        $("#purchaseCol").append(purchaseButton)
       

    };


    function convertCart(cart) {
    
        cart = cart.map(Number);
        cart = cart.map(function (item) {
            return item;
        });

    };
    

    function cartQty(cart) {

        cart.forEach(function (item) {
          if(!cartObject[item])
              cartObject[item] = 0;
            cartObject[item] += 1;
        })

    }








});
