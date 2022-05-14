const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const Connection = require("mysql2/typings/mysql/lib/Connection");
const { inherits } = require("util");

const db = mysql2.createConnection(
    {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
    }
);

const roleChoice = [];
const employeeChoice = [];
const departmentChoice = [];
const departmentId = [];
const roleId = [];
const managerId = [];

const validateString = async input => {
    if (input.trim() === "" || !isNaN(input.trim())) {
        return "This is not a valid response. Please try again.";
    } else {
        return true;
    }
}
const validateNumber = async input => {
    if (input.trim() === "" || !isNaN(input.trim())) {
        return "This is not a valid number. Please try again.";
    } else {
        return true;
    }
}

connection.connect(err => {
    if (err) throw err;
    console.log("Connection is a success.");
    init();
});

const userChoices = [{
    type: "list",
    message: "Please choose what you would like to do.",
    choices: ["View All Departments", "View All Roles", "View All Employees", "View All Employees By Department", "View All Employees By Manager", "View Total Utilized Budget By Department", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Update Employee Manager", "Delete Department", "Delete Role", "Delete Employee", "Quit"],
    name: "userChoice"
}];

