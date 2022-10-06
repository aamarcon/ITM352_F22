
/* function that takes a string as 
input and depending on the value of return errors returns an array of errors or a boolean true if that string is 
a non_negative integer and false otherwise */


function isNonNegInt (userInput, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(userInput) != userInput) errors.push('Not a number!'); // Check if string is a number value
    if(userInput < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(userInput) != userInput) errors.push('Not an integer!'); // Check that it is an integer
    if(returnErrors){
        return errors;
    }else if (errors.length == 0){
        return true;

    } else {
        return false;
    }
}

// var attributes  =  "Daniel;21;21+0.5;0.5-age";

// var pieces = attributes.split(";");

// for(i=0; i < pieces.length; i++){
//     errArray = isNonNegInt(pieces[i], true);
//     console.log(`i: ${i} ${errArray.join(", ")}`);
// }