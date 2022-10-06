// const {split} = require("lodash");

var attributes  =  "<name>;<age>;<age + 0.5>;<0.5 - age>"

var pieces = attributes.split(";");

for (i=0; i<pieces.length; i++){
    console.log(pieces[i]);
    console.log(`i=${i} value=${pieces[i]} type=${typeof pieces[i]}`)
}

var pieces = pieces.join(",")
console.log(pieces);


