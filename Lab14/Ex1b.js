var fs = require('fs');

var dataBeingRead = fs.readFileSync('./user_data.json', 'utf-8');
var users_reg_data = JSON.parse(dataBeingRead);
console.log(users_reg_data.kazman.password);