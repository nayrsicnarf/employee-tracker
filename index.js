const inquirer = require('inquirer');
const mysql2 = require("mysql2");
const consoleTable = require("console.table");
// created separate js files in scripts folder to resolve issues cause by containing everything in one index.js file
const { viewAllDepartments, addNewDepartment } = require("./scripts/departments")
const { viewAllEmployees, addNewEmployee } = require("./scripts/employees")
const { viewAllRoles, addNewRole, updateRole } = require("./scripts/roles")
// require("dotenv").config()
console.log("sanity check");
const mainMenu = [{
    type: "list",
    message: "What would you like to do? ",
    name: "menu",
    choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Done"
    ]
}];

const db = mysql2.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "employee_tracker_db"
    });

function menu() {
    inquirer
        .prompt(mainMenu)
        .then((response) => {
            if (response.menu === "View All Employees") {
                viewAllEmployees(db, menu);
            }
            else if (response.menu === "View All Departments") {
                viewAllDepartments(db, menu)
            }
            else if (response.menu === "View All Roles") {
                viewAllRoles(db, menu)
            }
            else if (response.menu === "Add Employee") {
                addNewEmployee(db, menu);
            }
            else if (response.menu === "Add Department") {
                addNewDepartment(db, menu);
            }
            else if (response.menu === "Add Role") {
                addNewRole(db, menu);
            }
            else if (response.menu === "Update Employee Role") {
                updateRole(db, menu);
            }
            else if (response.menu === "Done") {
                process.exit();
            }
        })
};

menu();