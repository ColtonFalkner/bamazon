var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "Ilovealthea13!",
    database: "bamazondb"
});

connection.connect(function(err){
    if(err)throw err;
    console.log("Connected");
})

function validateInput(value){
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)){
        return true;
    } else{
        return ("Please enter a whole non-zero number.");
    }
}

function displayProducts()