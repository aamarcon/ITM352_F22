//ALEXANDRE MARCONDES author
//Credit for code from class ITM352 -- MR. KAZMAN and PORT




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

//Gets the Jason file and saves to a variable called products
var products = require(__dirname + '/products_data.json');

//Add a products total_sold to each product in the jason file inicialized to 0.
products.forEach( (prod,i) => {prod.total_sold = 0});

//listening to a diplay.html request mine Index.html is display.html
app.get('/display.html', function(request, response, next){
    console.log("Just got the file display.html");
    next();
});

//Server side autentication for the form
// Waiting for a post request named purchase
app.post("/purchase", function (request, response) {
    
    //GET QUANTITY FROM USER AND CHECK VALIDITY
    // Code from line 68 to 73 inspired from a sample Mr. Kazman send me by email. 
    let isNumber = true;
    let buildStringForInvoice = "";
    
    for (i = 0;  i < products.length; i++){ //check all text boxes
        var userKey = "postQty" + i;
        var userQty = request.body[userKey]; // get the value

        if(typeof userQty != "undefined"){
            if(isNonNegativeInteger(userQty)){
                //valid quantity add to order
                products[i].total_sold += Number(userQty);
                // check see if enough in stock or onHand
                if(products[i].total_sold > products[i]["onHand"]){
                    // Send response that not enough in stock
                    response.send(`You want ${products[i].total_sold} of the ${products[i].name}. We only have ${products[i].onHand} on stock. Please hit the back button to purchase that amount.`)
                }else {
                    buildStringForInvoice += userKey + '=' +userQty + '&';
                }
            } else {
                // it is not a number or valid userQty!! ERROR
                isNumber = false;
            }
        } else {
            //TYPEOF USERQTY UNDEFINED !!ERROR TEXT NOT FOUND
            isNumber = false;
        }
    }
    if(!isNumber){
        // found ERROR back to the page
        //  response.redirect('display.html?error=Invalid%20Quantity');
    }
    else {
        // All good create Invoice
        response.redirect('invoice.html?' + buildStringForInvoice)

    }
    
});


app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback