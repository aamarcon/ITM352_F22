//get express
var express = require('express');
// make a variable app became an express object. 
var app = express();

// use a folder static name public
app.use(express.static(__dirname + '/public'));

//use url 
app.use(express.urlencoded({ extended: true }));

//function to check if it is a positive integer. 
function isNonNegativeInteger (queryString, returnErrors = false) {
    errors = []; // assume no errors at first

    if(Number(queryString) != queryString){
       errors.push('Not a number!'); //Add errors to errors array
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


app.get('/display.html', function(request, response, next){
    console.log(request.method + 'Not the star(*) but get ' + request.path);
    next();
});



var products = require(__dirname + '/products_data.json');
products.forEach( (prod,i) => {prod.total_sold = 0});

app.get("/products_data.js", function (request, response, next) {
   response.type('.js');
   var products_str = `var products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

app.post("/process_form", function (request, response) {
    var userQty = request.body['quantity_textbox'];

    if (typeof userQty != 'undefined') {
        if(isNonNegativeInteger(userQty)){

            let brand = products[0]['name'];
            let brand_price = products[0]['price'];

            products[0].total_sold += Number(userQty);

            response.redirect('invoice.html?quantity=' + userQty);
        } else {
            response.redirect('order_page.html?error=Invalid%20Quantity&quantity_textbox=' + userQty);
        };
    
    } 
    
 });

 //App all to catch any wrong request. 
app.all('*', function (request, response, next) {
    console.log("Something Went Wrong!! NOT A POST!! CATCH ALL (*)");
    next();
});
 
app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback







