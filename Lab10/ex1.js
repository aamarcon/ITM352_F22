function isNonNegInt (q) {
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    
} console.log("Passes a string as a parameter")
  
var numbers = [1, 2, 3];
x = numbers.length;
console.log(typeof(x));

xxxx = console.log


xxxx("Print something");

// Example of exporting a function
module.exports = function isNonNegativeInteger (queryString, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(queryString) != queryString) errors.push('Not a number!'); // Check if string is a number value
    if(queryString < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(queryString) != queryString) errors.push('Not an integer!'); // Check that it is an integer
    
    if (returnErrors) {
        return errors;
    } else if (errors.length == 0) {
        return true;
    } else {
        return false;
    }
}

// Example of importing a module using require
var isNonNegativeInteger = require("./Export.js");

var attributes = "Daniel;21;21.5;-20.5";
var pieces = attributes.split(";");

for (i=0; i<pieces.length; i++) {
    errorArray = isNonNegativeInteger(pieces[i], true);
    console.log(`i: ${i} ${errorArray.join(", ")}`);
}