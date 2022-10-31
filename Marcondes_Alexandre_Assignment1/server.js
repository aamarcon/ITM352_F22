//get express
var express = require('express');
// make a variable app became an express object. 
var app = express();

// use a folder static name public
app.use(express.static(__dirname + '/public'));

//use url 
app.use(express.urlencoded({ extended: true }));

//Loading the Json file and runing a loop to add product sold to the object.


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

 //App all to catch any wrong request. 
 app.all('*', function (request, response, next) {
    console.log( request.method + " to " + request.path);
    next();
});
 

//Converting a javaScript value to a javascrip object.
app.get("/products_data.js", function (request, response, next) {
   response.type('.js');
   var products_str = `var products = ${JSON.stringify(products)};`;
   response.send(products_str);
});


var products = require(__dirname + '/products_data.json');
products.forEach( (prod,i) => {prod.total_sold = 0});

app.get('/display.html', function(request, response, next){
    console.log("Just got the file display.html");
    next();
});

// app.post("/process_form", function (request, response) {
    
//     var parseObj = request.body;

//     var quantities = [];

//     //Loop to parse object and to get the quantity on the query string.
//     for (num in parseObj){
//         quantities += parseObj[num];
//     }
//     // check to see if is define a integer and positive
//     if (typeof quantities != 'undefined') {
//         for(i = 0; i < quantities.length; i++){
//             if(isNonNegativeInteger(quantities[i])){

//                 let brand = products[i]['name'];
//                 let brand_price = products[i]['price'];
//                 products[i].total_sold += Number(quantities[i]);

//             if(products[i].total_sold > products[i]['onHand']){
//                 response.redirect(`invoice.html`); 
        
//         } else {
//             response.redirect(`I am here`)
//         };
      
//     } else {
//         response.send("Hello from the bottom")
//     }
//     }
// } 

// });


app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback