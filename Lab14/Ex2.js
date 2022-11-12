var fs = require('fs');
	
	var fileName = 'user_data.json';
	
var iffile = fs.existsSync(fileName);
    console.log(iffile); // will get a boolean true or false. 
	if(iffile) {
    var dataBeingRead = fs.readFileSync('./user_data.json', 'utf-8');
	var users_reg_data = JSON.parse(dataBeingRead);
	console.log(users_reg_data);	
	}

