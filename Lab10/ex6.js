// function checkIt(item, index){
//     console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
// }


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





var attributes  =  "<name>;<age>;<age + 0.5>;<0.5 - age>"
var pieces = attributes.split(";");
for (i=0; i<pieces.length; i++){
    console.log(pieces[i]);
    console.log(`i=${i} value=${pieces[i]} type=${typeof pieces[i]}`)
}



console.log(pieces);


pieces.forEach((item, index) => {
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);

} ) 

