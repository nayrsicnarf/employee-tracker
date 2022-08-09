require("console.table");
require("dotenv").config();
const inquirer = require('inquirer');

function viewAllEmployees(db, cb) {
    db
        .query(`SELECT employee.id AS ID, employee.first_name AS "First Name",  employee.last_name AS "Last Name", empRole.title AS "Role", department.department_name AS "Department", empRole.salary AS "Salary", CONCAT (manager.first_name, " ", manager.last_name) AS "Manager" FROM employee LEFT JOIN empRole ON employee.role_id = empRole.id LEFT JOIN department ON empRole.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, function (err, results) {
            if (err) {
                console.log(err)
            }
            console.table(results);
            cb();
        })
};

function addNewEmployee(db, cb) {
    const listRole = [];
    db.query("SELECT title FROM empRole", (err, results) => {
        if (err) {
            console.log(err);
        }
        results.forEach((object) => {
            listRole.push(object.title);
        })
    });

    const listEmp = ["None"];
    db.query(`SELECT first_name FROM employee`, (err, results) => {
        if (err) {
            console.log(err);
        }
        results.forEach((object) => {
            listEmp.push(object.first_name);
        })
    });

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the first name of the employee? ",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the last name of the employee? ",
                name: "lastName"
            },
            {
                type: "list",
                message: "What is the title of the employee? ",
                name: "title",
                choices: listRole
            },
            {
                type: "list",
                message: "Who is this manager of the employee? ",
                name: "manager",
                choices: listEmp
            }
        ])
        .then((data) => {
            const sql = "SELECT id from empRole WHERE title = ?";
            const idRole = data.title;
            db.query(sql, idRole, (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (data.manager == "None") {
                    const titleId = result[0].id;
                    const first = data.firstName;
                    const last = data.lastName;
                    var manId = null;

                    console.log(titleId)
                    console.log(first)
                    console.log(last)
                    console.log(manId)

                    const finalsql = "INSERT INTO employee (role_id, first_name, last_name, manager_id) VALUES (?, ?, ?, ?)";
                    db.query(finalsql, [titleId, first, last, manId], (err, emp) => {
                        if (err) {
                            console.log(err);
                        }
                        cb();
                    })

                } else {
                    const nextSql = "SELECT id from employee WHERE first_name = ?";
                    const manName = data.manager;
                    db.query(nextSql, manName, (err, nextResults) => {
                        if (err) {
                            console.log(err)
                        }
                        const titleId = result[0].id;
                        const first = data.firstName;
                        const last = data.lastName;
                        var manId = nextResults[0].id;
                        const finalsql = "INSERT INTO employee (role_id, first_name, last_name, manager_id) VALUES (?, ?, ?, ?)";
                        db.query(finalsql, [titleId, first, last, manId], (err, emp) => {
                            if (err) {
                                console.log(err);
                            }
                            cb();
                        })
                    })
                }
            })
        })
}

module.exports = { viewAllEmployees, addNewEmployee };