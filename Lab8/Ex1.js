require("./products_data.js");
var num_product = 5;
var counter = 1;

while ( counter <= num_product) {
    if(counter > num_product/2) {
     console.log("Don't ask for anything else");
     process.exit();
 
    }else {
     console.log(counter + ". " + eval('name'+counter));
    }
     
     counter++;
 }
 console.log("That's all we have.")
 