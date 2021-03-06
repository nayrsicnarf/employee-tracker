const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// const logo = require("asciiart-logo");
// const config = require("./package.json");
// config.font = 'Big';
// config.logoColor = 'bold-green';
// config.textColor = 'green';
// config.borderColor = 'grey';
// console.log(logo(config).render()); 

const connection = mysql2.createConnection(
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

connection.connect(err => {
    if (err) throw err;
    console.log("Connection is a success.");
    // checkLength("department");
    // checkLength("role");
    // checkLength("employee");
    init();
});

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

const mainMenu = [
    {
        type: "list",
        message: "Please choose what you would like to do.",
        choices: ["View All Departments", "View All Employees", "View All Roles", "View All Employees By Department", "View Total Utilized Budget By Department", "View All Employees By Manager", "Add Department", "Delete Department", "Add Role", "Delete Role", "Add Employee", "Delete Employee", "Update Employee Role", "Update Employee Manager", "Quit"],
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
];

const departmentDeleteQuestion = [
    {
        type: "list",
        message: "Which department do you want to delete?",
        choices: departmentChoice,
        name: "departmentDelete"
    },
];

const employeeDepartmentQuestion = [
    {
        type: "list",
        message: "Which department of employees do you want to see?",
        choices: departmentChoice,
        name: "employeeByDepartment"
    },
];

const budegetDepartmentQuestion = [
    {
        type: "list",
        message: "Which department do you want to see the total utilized budget for?",
        choices: departmentChoice,
        name: "budegetDepartment"
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

const employeeDeleteQuestion = [
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
        choices: employeeChoice,
        name: "roleNew"
    },
    {
        type: "list",
        message: "Which role do you want to delete?",
        choices: roleChoice,
        name: "roleDelete"
    },
];

const roleDeleteQuestion = [
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
        choices: employeeChoice,
        name: "managerUpdate"
    },
    {
        type: "list",
        message: "Who is the new manager of the employee?",
        choices: employeeChoice,
        name: "managerNew"
    },
];

const managerEmployeeQuestion = [
    {
        type: "list",
        message: "Which manager of the employees do you want to see?",
        choices: ["Management", "Legal", "Engineering", "Finance"],
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
            case "View All Roles":
                rolesViewAll();
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
            case "Add Department":
                departmentAdd();
                break;
            case "Delete Department":
                departmentDelete();
                break;
            case "Add Role":
                roleAdd();
                break;
            case "Delete Role":
                roleDelete();
                break;
            case "Add Employee":
                employeeAdd();
                break;
            case "Delete Employee":
                employeeDelete();
                break;
            case "Update Employee Role":
                employeeRoleUpdate();
                break;
            case "Update Employee Manager":
                employeeManagerUpdate();
                break;
            case "Quit":
                connection.end();
                break;
        }
    });
};

const departmentViewAll = () => {
    connection.query("SELECT id, department_name as department FROM department", (err, res) => {
        if (err) throw err;
        if (res.length === 0) {
            console.log("\nNo valid departments\n");
            init();
        } else {
            console.log("\n");
            console.table(res);
            init();
        }
    });
};

const rolesViewAll = () => {
    connection.query("SELECT id, title as role, salary, department_id FROM role", (err, res) => {
        if (err) throw err;
        if (res.length === 0) {
            console.log("\nNo valid roles\n");
            init();
        } else {
            console.log("\n");
            console.table(res);
            init();
        }
    });
};

const employeeViewAll = () => {
    connection.query("SELECT e.id, e.first_name, e.last_name, r.title as role, d.department_name AS department, r.salary, concat(e2.first_name, SPACE(1), e2.last_name) AS manager FROM employee e LEFT JOIN employee e2 ON (e.manager_id = e2.id OR e.manager_id = null) LEFT JOIN role r ON (e.role_id = r.id or e.role_id = null) LEFT JOIN department d ON (r.department_id = d.id OR r.department_id = null)", (err, res) => {
        if (err) throw err;
        if (res.length === 0) {
            console.log("\nNo valid employees\n");
            init();
        } else {
            console.log("\n");
            console.table(res);
            init();
        }
    });
};

const employeesByDepartmentViewAll = () => {
    if (departmentChoice.length === 0) {
        console.log("\nNo valid departments\n");
        init();
    } else {
        inquirer.prompt(employeeDepartmentQuestion).then(res => {
            let keepRes = res.employeeByDepartment;
            connection.query("SELECT first_name, last_name FROM employee INNER JOIN role ON role_id = role.id INNER JOIN department ON department_id = department_id WHERE department_name = ?", [res.employeeByDepartment], (err, res) => {
                if (err) throw err;
                if (res.length === 0) {
                    console.log("\nNo valid employees\n");
                } else {
                    res.unshift({ "department": keepRes, "first_name": "X", "last_name": "X" });
                    console.log("\n");
                    console.table(res);
                }
            });
        }
        ).then(() => {
            init();
        }).catch((e) => { console.log(e) });
    };
};

const budgetByDepartmentViewTotal = () => {
    if (employeeChoice.length === 1) {
        console.log("\nNo valid employees\n");
        init();
    } else {
        inquirer.prompt(budegetDepartmentQuestion).then(res => {
            let keepRes = res.budegetDepartment;
            connection.query("SELECT sum(salary) as budget_total FROM role INNER JOIN employee ON role_id = role.id INNER JOIN department ON department_id = department.id WHERE department.name = ?", [res.budegetDepartment], (err, res) => {
                if (err) throw err;
                let budgetTotal = res[0].budget_total;
                let newRes = [{
                    "department": keepRes,
                    "budget_total": budgetTotal
                }];
                console.log("\n");
                console.table(newRes);
            });
        }).then(() => {
            init();
        }).catch((e) => { console.log(e) });
    }
};

const employeesByManagerViewAll = () => {
    if (employeeChoice.length === 1) {
        console.log("\nNo valid employees\n");
        init();
    } else {
        inquirer.prompt(managerEmployeeQuestion).then(res => {
            let firstName = res.managerEmployee.split(" ")[0];
            let lastName = res.managerEmployee.split(" ")[1];
            connection.query("SELECT t1.first_name, t1.last_name FROM employee t1 INNER JOIN employee t2 ON (t1.manager_id = t2.id) WHERE (t2.first_name = ? AND t2.last_name = ?)",
                [firstName, lastName],
                (err, res) => {
                    if (err) throw err;
                    console.log("\n");
                    if (res.length === 0) {
                        console.log("No employees who work under this manager.\n");
                    } else {
                        res.unshift({
                            "manager": "    -->",
                            "first_name": firstName,
                            "last_name": lastName
                        })
                        console.table(res);
                    }
                });
        }).then(() => {
            init();
        }).catch((e) => { console.log(e) });
    }
};

const checkLength = table => {
    let query = "";
    switch (table) {
        case "department":
            query = "SELECT * FROM department";
            break;
        case "role":
            query = "SELECT * FROM role";
            break;
        case "employee":
            query = "SELECT * FROM employee";
            break;
        default:
            connection.end();
    }
    connection.query(query, (err, res) => {
        if (err) throw err;
        if (res.length === 0) {
            if (table === "employee") {
                employeeChoice.length = 0;
                employeeChoice.push("None");
            }
            return;
        } else {
            switch (table) {
                case "department":
                    departmentChoice.length = 0;
                    departmentId.length = 0;
                    for (let i = 0; i < res.length; i++) {
                        let departmentName = res[i].name;
                        let departmentId = res[i].id;
                        let newObj = {
                            [departmentName]: departmentId
                        }
                        departmentChoice.push(departmentName);
                        departmentId.push(newObj);
                    };
                    break;
                case "role":
                    roleChoice.length = 0;
                    roleId.length = 0;
                    for (let i = 0; i < res.length; i++) {
                        let roleName = res[i].title;
                        let roleId = res[i].id;
                        let newObject = {
                            [roleName]: roleId
                        }
                        roleChoice.push(roleName);
                        roleId.push(newObject);
                    };
                    break;
                case "employee":
                    employeeChoice.length = 0;
                    managerId.length = 0;
                    for (let i = 0; i < res.length; i++) {
                        let fullName = res[i].first_name + " " + res[i].last_name;
                        let managerId = res[i].id;
                        let newObject = {
                            [fullName]: managerId
                        }
                        employeeChoice.push(fullName);
                        managerId.push(newObject);
                    };
                    employeeChoice.push("None");
                    break;
            }
        }
    });
};

const departmentAdd = () => {
    inquirer.prompt(departmentQuestions).then(res => {
        connection.query("INSERT INTO department SET ?", {
            name: res.deptartmentName,
        }, (err, res) => {
            if (err) throw err;
        });
    }).then(() => {
        checkLength("department");
        init();
    }).catch((e) => { console.log(e) });
};

const departmentDelete = () => {
    checkLength("department");
    if (departmentDelete.length === 0) {
        console.log("\nNo valid departments\n");
        init();
    } else {
        departmentChoice.push("None");
        inquirer.prompt(departmentDeleteQuestion).then(res => {
            if (res.departmentDelete === "None") {
                console.log("\nNone selected.\n");
            } else {
                connection.query("DELETE FROM department WHERE ?", {
                    name: res.departmentDelete,
                }, (err, res) => {
                    if (err) throw err;
                });
            }
            departmentChoice.pop();
        }).then(() => {
            checkLength("department");
            init();
        }).catch((e) => { console.log(e) });
    }
};

const roleAdd = () => {
    if (departmentChoice.length === 0) {
        console.log("\nA valid department is needed prior to adding new role\n");
        init();
    } else {
        inquirer.prompt(roleQuestions).then(res => {
            connection.query("INSERT INTO role SET ?", {
                title: res.roleName,
                salary: res.roleSalary,
                department_id: findId(departmentId, res.roleDeptartment)
            }, (err, res) => {
                if (err) throw err;
            }
            );
        }).then(() => {
            checkLength("role");
            init();
        }).catch((e) => { console.log(e) });
    }
};

const roleDelete = () => {
    checkLength("role");
    if (roleChoice.length === 0) {
        console.log("\nNo valid roles\n");
        init();
    } else {
        roleChoice.push("None");
        inquirer.prompt(roleDeleteQuestion).then(res => {
            if (res.roleDelete === "None") {
                console.log("\nNone selected.\n");
            } else {
                connection.query("DELETE FROM role WHERE ?", {
                    title: res.roleDelete,
                }, (err, res) => {
                    if (err) throw err;
                });
            }
            roleChoice.pop();
        }).then(() => {
            checkLength("role");
            init();
        }).catch((e) => { console.log(e) });
    }
};

const employeeAdd = () => {
    checkLength("employee");
    if (departmentChoice.length === 0) {
        console.log("\nA valid department is needed prior to adding new employee\n");
        init();
    } else if (roleChoice.length === 0) {
        console.log("\nA valid rold is needed prior to adding new employee\n");
        init();
    } else {
        inquirer.prompt(employeeQuestions).then(res => {
            connection.query("INSERT INTO employee SET ?", {
                first_name: res.firstName,
                last_name: res.lastName,
                role_id: findId(roleId, res.employeeRole),
                manager_id: findId(managerId, res.employeeManager)
            }, (err, res) => {
                if (err) throw err;
            }
            );
        }).then(() => {
            checkLength("employee");
            init();
        }).catch((e) => { console.log(e) });
    }
};

const employeeDelete = () => {
    checkLength("employee");
    if (employeeChoice.length === 1) {
        console.log("\nNo valid employees\n");
        init();
    } else {
        inquirer.prompt(employeeDeleteQuestion).then(res => {
            let firstName = res.employeeDelete.split(" ")[0];
            let lastName = res.employeeDelete.split(" ")[1];
            if (firstName === "None") {
                console.log("\nNone selected.\n");
            } else {
                connection.query(
                    "DELETE FROM employee WHERE ? AND ?", [{
                        first_name: firstName
                    },
                    {
                        last_name: lastName
                    }], (err, res) => {
                        if (err) throw err;
                    }
                );
            }
        }).then(() => {
            checkLength("employee");
            init();
        }).catch((e) => { console.log(e) });
    }
};

const employeeRoleUpdate = () => {
    checkLength("employee");
    if (employeeChoice.length === 1) {
        console.log("\nNo valid employees\n");
        init();
    } else if (roleChoice.length === 0) {
        console.log("\nNo valid roles\n");
        init();
    } else {
        inquirer.prompt(roleQuestions).then(res => {
            let firstName = res.roleUpdate.split(" ")[0];
            let lastName = res.roleUpdate.split(" ")[1];
            if (firstName === "None") {
                console.log("\nNone selected.\n");
            } else {
                connection.query("UPDATE employee SET ? WHERE ? AND ?", [{
                    role_id: findId(roleId, res.roleNew)
                },
                {
                    first_name: firstName
                },
                {
                    last_name: lastName
                }], (err, res) => {
                    if (err) throw err;
                }
                );
            }
        }).then(() => {
            checkLength("employee");
            init();
        }).catch((e) => { console.log(e) });
    }
};

const employeeManagerUpdate = () => {
    checkLength("employee");
    if (employeeChoice.length === 1) {
        console.log("\nNo valid employees");
        init();
    } else {
        inquirer.prompt(managerQuestions).then(res => {
            let firstName = res.managerUpdate.split(" ")[0];
            let lastName = res.managerUpdate.split(" ")[1];
            if (firstName === "None") {
                console.log("\nNone selected.\n");
            } else {
                connection.query("UPDATE employee SET ? WHERE ? AND ?", [{
                    manager_id: findId(managerId, res.managerNew)
                },
                {
                    first_name: firstName
                },
                {
                    last_name: lastName
                }], (err, res) => {
                    if (err) throw err;
                }
                );
            }
        }).then(() => {
            checkLength("employee");
            init();
        }).catch((e) => { console.log(e) });
    }
};

const findId = (arrayName, arrayParam) => {
    if (arrayParam === "None") {
        return null;
    } else {
        let returnId;
        arrayName.forEach((value, index) => {
            for (let key in value) {
                if (arrayParam === key) {
                    returnId = value[key];
                }
            }
        });
        return returnId;
    }
};