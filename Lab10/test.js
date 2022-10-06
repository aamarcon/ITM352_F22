require("./ex4.js");

var attributes  =  "Daniel;21;21+0.5;0.5-age";

var pieces = attributes.split(";");

for(i=0; i < pieces.length; i++){
    errArray = isNonNegInt(pieces[i], true);
    console.log(`i: ${i} ${errArray.join(", ")}`);
}