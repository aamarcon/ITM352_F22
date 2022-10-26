function isNonNegativeInteger (quantities, returnErrors = false) {
  errors = []; // assume no errors at first

  if(Number(quantities) != quantities){
     errors.push('Not a number!'); 
  }
  else {
    if (quantities < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(quantities) != quantities) errors.push('Not an integer!'); // Check that it is an integer
  }// Check if string is a number value
  
  if (returnErrors) {
      return errors;
  } else if (errors.length == 0) {
      return true;
  } else {
      return false;
  }
}


var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true })); // to decode express body.

app.get('/test', function (request, response, next) {
  console.log("Got a text path")
    next();
});

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});

app.post("/process_form", function (request, response) {
  var q = request.body['quantity_textbox'];
  if (typeof q != 'undefined') {
  response.send(`Thank you for purchasing ${q} things!`);
  } else {
    response.send(`${q} is not valid qunatity == hit the back button`)
  }
});
app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback

