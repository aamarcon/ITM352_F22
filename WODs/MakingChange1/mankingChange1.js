// This gives the least amount of change needed

var quarters = 0;
var dimes = 0;
var nickles = 0;
var pennies = 0;

var amount = 2.68;

// amount is total amounts in pennies
amount *= 100;


// to find out amount of quarters. 

if(amount/25 >= 1 ){
    quarters = parseInt(amount/25); // gives the amount of quarters
    amount = amount%25; // keep deminishing the amount for dimes
   
}else
 {quarters = 0; }
 if(amount/10 >= 1 ){
    dimes = parseInt(amount/10); // gives the amount of dimes
    amount = amount%10; // keep deminishing the amount for nickles
    
}else
 {dimes = 0; }
 if(amount/5 >= 1 ){
    nickles = parseInt(amount/5); // gives the amount of nickles
    amount = amount%5; // keep deminishing the amount for pennies
   
}else
 {nickles = 0; }
 if(amount/1 >= 1 ){
    pennies = parseInt(amount/1); // gives the amount of pennies
    amount = 0; // there is no more amount
   
}else
 {pennies = 0; }

console.log(`The least amount of change is ${quarters} quarters, ${dimes} dimes, ${nickles} nickles and ${pennies} pennies`);


