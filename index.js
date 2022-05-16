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

const mainMenu = [
    {
        type: "list",
        message: "Please choose what you would like to do.",
        choices: ["View All Departments", "View All Employees", "View All Employees By Department", "View All Employees By Manager", "View All Roles", "View Total Utilized Budget By Department", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Update Employee Manager", "Delete Department", "Delete Role", "Delete Employee", "Quit"],
        name: "mainMenu"
    },
];

const departmentQuestions = [
    {
        type: "input",
        message: "What is the name of the department?",
        name: "deptartmentName",
        validate: validateString
    },
];

const employeeQuestions = [
    {
        type: "input",
        message: "What is the first name of the employee?",
        name: "firstName",
        validate: validateString
    },
    {
        type: "input",
        message: "What is the last name of the employee?",
        name: "lastName",
        validate: validateString
    },
    {
        type: "list",
        message: "Who is the manager of the employee?",
        choices: employeeChoice,
        name: "employeeManager"
    },
    {
        type: "list",
        message: "What is the role of the employee?",
        choices: roleChoice,
        name: "employeeRole"
    },
];

const roleQuestions = [
    {
        type: "input",
        message: "What is the role called?",
        name: "roleName",
        validate: validateString
    },
    {
        type: "list",
        message: "Which department is this role a part of?",
        choices: departmentChoice,
        name: "roleDeptartment"
    },
    {
        type: "input",
        message: "What is the salary of this role?",
        name: "roleSalary",
        validate: validateNumber
    },
    {
        type: "list",
        message: "Which employee would you like to update the role of?",
        choices: employeeChoice,
        name: "roleUpdate"
    },
    {
        type: "list",
        message: "What is the new role of this employee?",
        choices: roleChoice,
        name: "newRole"
    },
];

const managerQuestions = [
    {
        type: "list",
        message: "Which employee would you like to update the manager of?",
        choices: employeeChoice,
        name: "managerUpdate"
    },
    {
        type: "list",
        message: "Who is the new manager of the empployee?",
        choices: employeeChoice,
        name: "newManager"
    },
];