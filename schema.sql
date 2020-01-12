DROP DATABASE IF EXISTS bamazondb;

CREATE database bamazondb;

USE bamazondb;

CREATE TABLE products(
    item_id INT(4) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL, 
    stock_quantity INT (20) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (101, "The Big Lebowski", "Movies", 19.99, 20),
        (202, "The Jerk", "Movies", 9.99, 15),
        (303, "The Last Dragon", "Movies", 15.99, 10),
        (404, "Disco Elysium", "Video_Games", 39.99, 30),
        (505, "Death Stranding", "Video_Games", 59.99, 45),
        (606, "Half Life 3", "Video_Games", 999.99, 1),
        (707, "The Office", "Television", 9.99, 50),
        (808, "Futurama", "Television", 29.99, 15),
        (909, "Parks and Recreation", "Television", 14.99, 35),
        (1010, "Crash Zone", "Television", 4.99, 40)