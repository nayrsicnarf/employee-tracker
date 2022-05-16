const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render()); 

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
        choices: ["View All Departments", "View All Employees", "View All Employees By Department", "View Total Utilized Budget By Department", "View All Employees By Manager", "View All Roles", "Add Department", "Add Employee", "Add Role", "Update Employee Role", "Update Employee Manager", "Delete Department", "Delete Role", "Delete Employee", "Quit"],
        name: "mainMenuRes"
    },
];

const departmentQuestions = [
    {
        type: "input",
        message: "What is the name of the department?",
        name: "deptartmentName",
        validate: validateString
    },
    {
        type: "list",
        message: "Which department of employees do you want to see?",
        choices: employeeDepartment,
        name: "employeeDepartment"
    },
    {
        type: "list",
        message: "Which department do you want to see the total utilized budget for?",
        choices: budegetDepartment,
        name: "budegetDepartment"
    },
    {
        type: "list",
        message: "Which department do you want to delete?",
        choices: departmentDelete,
        name: "departmentDelete"
    },
];

const employeeDepartmentQuestion = [
    {
        type: "list",
        message: "Which department of employees do you want to see?",
        choices: employeeDepartment,
        name: "employeeDepartment"
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
    {
        type: "list",
        message: "Which employee do you want to delete?",
        choices: employeeChoice,
        name: "employeeDelete"
    }
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
        choices: roleDepartment,
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
        choices: employeeRole,
        name: "roleUpdate"
    },
    {
        type: "list",
        message: "What is the new role of this employee?",
        choices: newEmployeeRole,
        name: "roleNew"
    },
    {
        type: "list",
        message: "Which role do you want to delete?",
        choices: roleChoice,
        name: "roleDelete"
    },
];

const managerQuestions = [
    {
        type: "list",
        message: "Which employee would you like to update the manager of?",
        choices: managerEmployee,
        name: "managerUpdate"
    },
    {
        type: "list",
        message: "Who is the new manager of the empployee?",
        choices: managerNew,
        name: "managerNew"
    },
    {
        type: "list",
        message: "Which manager of the employees do you want to see?",
        choices: managerEmployee,
        name: "managerEmployee"
    },
];

const init = () => {
    inquirer.prompt(mainMenu).then(res => {
        switch (res.mainMenuRes) {
            case "View All Departments":
                departmentViewAll();
                break;
            case "View All Employees":
                employeeViewAll();
                break;
            case "View All Employees By Department":
                employeesByDepartmentViewAll();
                break;
            case "View Total Utilized Budget By Department":
                budgetByDepartmentViewTotal();
                break;
            case "View All Employees By Manager":
                employeesByManagerViewAll();
                break;
            case "View All Roles":
                rolesViewAll();
                break;
            case "Add Department":
                departmentAdd();
                break;
            case "Add Employee":
                employeeAdd();
                break;
            case "Add Role":
                roleAdd();
                break;
            case "Update Employee Role":
                employeeRoleUpdate();
                break;
            case "Update Employee Manager":
                employeeManagerUpdate();
                break;
            case "Delete Department":
                departmentDelete();
                break;
            case "Delete Role":
                roleDelete();
                break;
            case "Delete Employee":
                employeeDelete();
                break;
            case "Quit":
                connection.end();
                break;
        }
    });
};

const departmentViewAll = () => {
    connection.query("SELECT id, name as department FROM department", (err, res) => {
        if (err) throw err;
        if (res.length === 0) {
            console.log("\nThere are no departments added yet!\n");
            init();
        } else {
            console.log("\n");
            console.table(res);
            init();
        }
    });
};

const employeeViewAll = () => {
    connection.query("SELECT e.id, e.first_name, e.last_name, r.title as role, d.name AS department, r.salary, concat(e2.first_name, SPACE(1), e2.last_name) AS manager FROM employee e LEFT JOIN employee e2 ON (e.manager_id = e2.id OR e.manager_id = null) LEFT JOIN role r ON (e.role_id = r.id or e.role_id = null) LEFT JOIN department d ON (r.department_id = d.id OR r.department_id = null)", (err, res) => {
        if (err) throw err;
        if (res.length === 0) {
            console.log("\nThere are no employees added yet!\n");
            init();
        } else {
            console.log("\n");
            console.table(res);
            init();
        }
    });
};

const employeesByDepartmentViewAll = () => {
    if (employeeDepartment.length === 0) {
        console.log("\nThere are no departments added yet!\n");
        init();
    } else {
        inquirer.prompt(employeeDepartmentQuestion).then(res => {
            let keepRes = res.employeeDepartment;
            connection.query(
                "SELECT first_name, last_name FROM employee INNER JOIN role ON role_id = role.id INNER JOIN department ON department_id = department.id WHERE department.name = ?", [res.employeDepartment], (err, res) => {
                    if (err) throw err;
                    if (res.length === 0) {
                        console.log("\nThere are no employees added yet!\n");
                        conLogRN(5); // conLogRN(x) adds extra spacing to the output to make it look nice
                    } else {
                        res.unshift({"department": keepRes, "first_name": "X", "last_name": "X"});
                        console.log("\n");
                        console.table(res);
                        conLogRN(5);
                    }
                });
        }).then(() => { init();
        }).catch((e) => { console.log(e)
        });
    }
};


const rolesViewAll = () => {
    connection.query("SELECT id, title as role, salary, department_id FROM role", (err, res) => {
        if (err) throw err;
        if (res.length === 0) {
            console.log("\nThere are no roles added yet!\n");
            init();
        } else {
            console.log("\n");
            console.table(res);
            init();
        }
    });
};