
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


app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});
app.get('/test', function(request, response, next){
    console.log(request.method + 'to path# ' + request.path);
    next();

});

app.post("/process_form", function (request, response) {

    var userQty = request.body['quantity_textbox'];

    if (typeof userQty != 'undefined') {
        if(isNonNegativeInteger(userQty)){
            response.send(`Thank you for purchasing ${userQty} things!`);
        } else {
            response.send(`Error: ${userQty} is not a quantity. Hit the back button to fix..`)
        };
    
    } 
 });
 


app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback
