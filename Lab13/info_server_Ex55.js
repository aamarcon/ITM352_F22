
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));

function isNonNegativeInteger (queryString, returnErrors = false) {
    errors = []; // assume no errors at first

    if(Number(queryString) != queryString){
       errors.push('Not a number!'); 
    }
    else {
      if (queryString < 0) errors.push('Negative value!'); // Check if it is non-negative
      if (parseInt(queryString) != queryString) errors.push('Not an integer!'); // Check that it is an integer
    }// Check if string is a number value
    
    if (returnErrors) {
        return errors;
    } else if (errors.length == 0) {
        return true;
    } else {
        return false;
    }
}

app.get('/test', function(request, response, next){
    console.log(request.method + 'Not the star(*) but get ' + request.path);
    next();
});

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});

var products = require(__dirname + '/product_data.json');
products.forEach( (prod,i) => {prod.total_sold = 0});

app.get("/product_data.js", function (request, response, next) {
   response.type('.js');
   var products_str = `var products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

app.post("/process_form", function (request, response) {
    var userQty = request.body['Thisname'];
    console.log("Thisname");
    console.log(userQty);
    if (typeof userQty != 'undefined') {
        if(isNonNegativeInteger(userQty)){



            let brand = products[0]['name'];
            let brand_price = products[0]['price'];

            products[0].total_sold += Number(userQty);

            response.redirect('receipt.html?quantity=' + userQty);
            
        } else {
            response.redirect('order_page.html?error=Invalid%20Quantity&quantity_textbox=' + userQty);
        };
    
    } 
    
 });
 


app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback
