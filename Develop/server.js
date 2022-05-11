const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const db = mysql2.createConnection(
    {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
    }
);

