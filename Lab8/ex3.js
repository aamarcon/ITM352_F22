require("./products_data.js");
var num_product = 5;
var counter = 1;

for(i = 1; eval("typeof name" + i) != 'undefined'; i++){
    if(i > num_product/4 && i < num_product*3/4) {
          console.log(i + ". " + eval('name'+ i) + " is sold out");
        
    }else {
         console.log(i  + ". " + eval('name'+ i));
          }
}
console.log("That's all we have.")
