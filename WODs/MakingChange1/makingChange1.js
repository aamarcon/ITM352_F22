// console.log(parseInt(289/25));
// console.log(289%25);

// console.log(parseInt(14/10));
// console.log(14%10);

// console.log(parseInt(4/5));
// console.log(4%5);

// console.log(parseInt(4/1));
// console.log(4%1);

amount = 1.22;

// make amount in pennies *100
amount *= 100;

// check amount aginst quarters.

if(amount/25 >= 1) {
    quarters = parseInt(amount/25);
    console.log(quarters);
    amount = amount%25;
    console.log(amount);

    
}else quarters = 0; // if no quarters value 0

if(amount/10 >= 1){
    dimes = parseInt(amount/10);
    console.log(dimes);
    amount = amount%10
    console.log(amount);
}else dimes = 0;
if(amount/5 >= 1){
    nickles = parseInt(amount/5);
    console.log(nickles);
    amount = amount%5;
    console.log(amount);
}else nickles = 0;
if(amount/1 >= 1){
    pennies = parseInt(amount/1);
    console.log(pennies);
    amount = 0;
    console.log(amount);
}else pennies = 0;
console.log(`You have as chance ${quarters} quarters, ${dimes} dimes, ${nickles} nickles and ${pennies} pennies`)
