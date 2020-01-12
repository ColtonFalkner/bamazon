var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ilovealthea13!",
  database: "bamazondb"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
});

function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && sign === 1) {
    return true;
  } else {
    return "Please enter a whole non-zero number.";
  }
}

function displayProducts() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    var displayTable = new Table({
      head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
      colWidths: [10, 25, 25, 10, 14]
    });
    for (var i = 0; i < res.length; i++) {
      displayTable.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(displayTable.toString());
    purchasePrompt();
  });
}

function purchasePrompt() {
  inquirer.prompt([
    {
      name: "ID",
      type: "input",
      message: "Please enter the Item Id you would like for purchase.",
      validate: validateInput,
      filter: Number
    },
    {
        name: "Quantity",
        type: "input",
        message: "How many items do you wish to purchase?",
        validate: validateInput, 
        filter: Number
    }
  ]).then(function(answers){
      var quantityNeeded = answers.Quantity;
      var IDrequested = answers.ID;
      purchaseOrder(IDrequested, quantityNeeded)
  });
};

function purchaseOrder(ID, amtNeeded){
    connection.query('SELECT * FROM products WHERE item_id = ' + ID, function(err,res){
        if(err){console.log(err)};
        if(amtNeeded <= res[0].stock_quantity){
            var totalCost = res[0].price * amtNeeded;
            console.log("Good news! Your order is in stock!");
            console.log("Your total cost for " + amtNeeded + " " + res[0].product_name + " is " + totalCost + ". Thank you!");
            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + " WHERE item_id =" + ID);
        }else{
            console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + " to complete your order.");
        };
        displayProducts();
    });
};

displayProducts();
