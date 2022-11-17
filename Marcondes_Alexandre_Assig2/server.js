//ALEXANDRE MARCONDES author
//Credit for code from class ITM352 -- MR. KAZMAN and PORT
//SERVER FOR ASSIGNMENT 2

//-----------------------FUNCTIONS ---------------------

function loggedUsers(user, password, email){

}
//------------------------END FUNCTIONS ----------------
//get express
var express = require('express');
// make a variable app became an express object. 
var app = express();


//keep errors on server to share with registration page
var errors = {};

// make able to file/IO
var fs = require('fs');
const { URLSearchParams } = require('url');

//variable for the people that are register
var fregistration = 'registration.json';

var data = fs.readFileSync(fregistration, "utf8");
var user_reg_data = JSON.parse(data);// is a string of all the users on the registration file. 
console.log(user_reg_data["kazman"].name);
//temporary variable to use after server reboot with the 
// query URL only. to send to invoice. 
var temp_string = 'temp_string.txt';

var tempdata = fs.readFileSync(temp_string, "utf8");
// var built_for_invoce_from_temp_file = (tempdata);
// use a folder static name public

// read file of users that are logged in to variable
var flogged_users = "logged_users.json";
console.log(flogged_users);
// assigned the file to a variable
var users_data = fs.readFileSync(flogged_users, 'utf8');
console.log(users_data);

//parse the object to a variable.
var users_object_logged = JSON.parse(users_data);
console.log(users_object_logged);


app.use(express.static(__dirname + '/public'));

//use url 
app.use(express.urlencoded({ extended: true }));
//Loading the Json file and runing a loop to add product sold to the object.

//function to check if it is a positive integer. 
function isNonNegativeInteger (queryString, returnErrors = false) {
    errors = []; // assume no errors at first

    if(Number(queryString) != queryString){
       errors.push('Not a number!'); //Add errors to errors array
    }
    else {
      if (queryString < 0) errors.push('Negative value!'); // Check if it is non-negative
      if (parseInt(queryString) != queryString) errors.push('Not an integer!'); // Check that it is an integer
    }// Check if string is a number value
    
    if (returnErrors) {
        return errors;
    } else if (errors.length == 0) {
        return true;
    } else {
        return false;
    }
}

 //App all to catch any wrong request. 
app.all('*', function (request, response, next) {
    console.log( request.method + " to " + request.path);
    next();
});
 

//Converting a javaScript value to a javascrip object.
app.get("/products_data.js", function (request, response, next) {
   response.type('.js');
   var products_str = `var products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

//Gets the Jason file and saves to a variable called products
var products = require(__dirname + '/products_data.json');

//Add a products total_sold to each product in the jason file inicialized to 0.
products.forEach( (prod,i) => {prod.total_sold = 0});

//listening to a diplay.html request mine Index.html is display.html
app.get('/display.html', function(request, response, next){
    next();
});

//Server side autentication for the form
// Waiting for a post request named purchase
app.post("/purchase", function (request, response) {
    
    //GET QUANTITY FROM USER AND CHECK VALIDITY
    // Code from line 68 to 73 inspired from a sample Mr. Kazman send me by email. 
    let isNumber = true;
    let buildStringForInvoice = "";
    let buildStringForError = "";
    
    for (i = 0;  i < products.length; i++){ //check all text boxes
        var userKey = "postQty" + i;
        var userQty = request.body[userKey]; // get the value

        if(typeof userQty != "undefined"){
            if(isNonNegativeInteger(userQty)){
                //valid quantity add to order
                products[i].total_sold += Number(userQty);
                // check see if enough in stock or onHand
                if(products[i].total_sold > products[i]["onHand"]){
                    // Send response that not enough in stock
                    response.send(`You want ${products[i].total_sold} of the ${products[i].name}. We only have ${products[i].onHand} on stock. Please hit the back button to purchase that amount.`)
                }else {
                    buildStringForInvoice += userKey + '=' +userQty + '&';
                }
            } else {
                 // it is not a number or valid userQty!! ERROR built a ERROR string
                 isNumber = false;

                 for(i = 0; i < products.length; i++){
                     userKey = "postQty" + i; // remember name of KEY is postQty
                     userQty = request.body[userKey]; // get the value. VALUE IS userQty
                 
                     buildStringForError += userKey + '=' +userQty + '&';
                 }
                 response.redirect('display.html?' + buildStringForError );
             }
         } else {
             //TYPEOF USERQTY UNDEFINED !!ERROR TEXT NOT FOUND
             isNumber = false;
             response.send(`display.html?` + buildStringForError);
         }
     }
     if(!isNumber){
         // found ERROR back to the page
          response.redirect(`display.html?` + buildStringForError );
     }
     else {
         // All good create Invoice
         response.redirect(`login?`+ buildStringForInvoice);
        //  response.redirect(`invoice.html?` + buildStringForInvoice);
    }
});


app.get("/login", function (request, response) {

 // Process login form POST and redirect to logged in page if ok, back to login page if not
 let x = new URLSearchParams(request.query);
 let save_query = x.toString();

  //write query to the temp file in case of create account.
 fs.writeFileSync(temp_string, save_query);
// Give a simple login form
str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
<a href='./register'><button type="button"> Click here to register</button> <a/>
</body>
    `;
response.send(str);
});

app.post("/login", function (request, response) {
    let params = new URLSearchParams(request.query);
    let save_query = params.toString();
    //grab username and password and save to a variable.
    the_username = request.body['username'].toLowerCase();
    the_password = request.body['password'];

    to_verify_password = `password=${the_password}`;
    to_verify_user = `username=${the_username}`;
    //check to see if the username is define. 
    if (typeof user_reg_data[the_username] != 'undefined') {
        // grab data from user registration and check against password from query
        if (user_reg_data[the_username].password == the_password){

            // if good sent to invoice and pass params as a string. 
            response.redirect('success?' + params.toString() + '&' + to_verify_user );
        } else {
            // if not match tell user wrong password
            response.send(`Wrong password!`);
        }
        return;
    }
    // 
    response.send(`${the_username} does not exist`);
});


//get for registration from
// creates a string of 
app.get("/register", function (request, response) {
    //get params and save to params to send to invoice
    // Give a simple register form
    str = `
    <body> 
    <form action="" method="POST">
    <input type="text" name="username" size="40" placeholder="enter username" > 
    ${ (typeof errors['no_username'] != 'undefined')?errors['no_username']:''}
    ${ (typeof errors['username_taken'] != 'undefined')?errors['username_taken']:''}
    <br />
    <input type="password" name="password" size="40" placeholder="enter password"><br />
    <input type="password" name="repeat_password" size="40" placeholder="enter password again">
    ${ (typeof errors['password_mismatch'] != 'undefined')?errors['password_mismatch']:''}
    <br />
    <input type="email" name="email" size="40" placeholder="enter email"><br />
    <input type="submit" value="Submit" id="submit">
    </form>
    </body>
        `;

        response.send(str);
        
    });

// This post is modify code form Assignment 2 webpage
// Kazman and Ports original code 
app.post("/register", function (request, response) {

        //Get the temp file to use the save the string to a variable. 
        params = fs.readFileSync(temp_string, "utf8");

        // process a simple register form
        username = request.body.username.toLowerCase();
    
        // check is username define put into an error array if not define.
    
        if(typeof user_reg_data[username] != 'undefined') {
            errors['username_taken'] = `Hey! ${username} is already registered!`;
        }
        // check is password matches if no match put into an error array with key password_mismatch 
        if(request.body.password != request.body.repeat_password) {
            errors['password_mismatch'] = `Repeat password not the same as password!`;
        } 
        // check if did not enter a user name put on a error object with key no_username. 
        if(request.body.username == '') {
            errors['no_username'] = `You need to select a username!`;
        }
        // if errors is empty do the following. 
        if(Object.keys(errors).length == 0) {
            user_reg_data[username] = {};
            user_reg_data[username].password = request.body.password;
            user_reg_data[username].email = request.body.email;
            fs.writeFileSync(fregistration, JSON.stringify(user_reg_data));
    
            response.redirect(`invoice.html?`+ params.toString());
        } else {
            response.redirect("./register");
        }
    });

app.get("/success", function(request, response){
    create_log_in_group = [];
    
    string_query = new URLSearchParams(request.query);
    console.log(string_query);
    string_query.forEach(function(value, key){
    create_log_in_group.push(key);
    })
    console.log(create_log_in_group);
    
    //check if the user is on registration

    });



app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback