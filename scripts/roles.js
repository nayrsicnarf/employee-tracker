require("console.table");
require("dotenv").config();
const inquirer = require('inquirer');

function viewAllRoles(db, cb) {
    db
        .query(`SELECT empRole.id AS "ID", empRole.title AS "Title", department.department_name AS "Department", empRole.salary AS "Salary" FROM empRole LEFT JOIN department ON empRole.department_id = department.id`, function (err, results) {
            if (err) {
                console.log(err)
            }
            console.table(results);
            cb();
        })
};

function addNewRole(db, cb) {
    const listDep = [];
    db.query("SELECT department_name FROM department", (err, results) => {
        if (err) {
            console.log(err);
        }
        results.forEach((object) => {
            listDep.push(object.department_name);
        })

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is this role called?",
                    name: "title"
                },
                {
                    type: "input",
                    message: "What is the salary of this role?",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "What department does is this role in?",
                    name: "depart",
                    choices: listDep,
                }
            ])

            .then(
                (data) => {
                    const sql = "SELECT id FROM department WHERE department_name = ?";
                    const idDep = data.depart;
                    db.query(sql, idDep, (err, results) => {
                        if (err) {
                            console.log(err);
                        }
                        const roleTitle = data.title;
                        const roleSalary = parseInt(data.salary);
                        const roleDep = results[0].id;
                        const roleSql = "INSERT INTO empRole (title, salary, department_id) VALUES (?, ?, ?)";
                        db.query(roleSql, [roleTitle, roleSalary, roleDep], (err, finish) => {
                            if (err) {
                                console.log(err);
                            }
                            cb();
                        })
                    })
                }
            )
    })
};

function updateRole(db, cb) {
    selectEmpNames = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT first_name FROM employee", (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
        })
    }

    selectRoleTitles = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT title FROM empRole", (error, titles) => {
                if (error) {
                    return reject(error);
                }
                return resolve(titles);
            })
        })
    }

    async function followQueries() {
        const result1 = await selectEmpNames();
        const result2 = await selectRoleTitles();

        const promises = [result1, result2];

        try {
            const results = await Promise.all(promises).then((data) => {
                nameArr = [];
                result1.forEach((object) => {
                    nameArr.push(object.first_name)
                })
                titleArr = [];
                result2.forEach((object) => {
                    titleArr.push(object.title)
                })
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "Whose role do you want to update? ",
                            name: "person",
                            choices: nameArr
                        },
                        {
                            type: "list",
                            message: "What is the new role you would like to assign? ",
                            name: "newRole",
                            choices: titleArr
                        }
                    ])
                    .then((data) => {
                        const sql = "SELECT id from empRole WHERE title = ?";
                        const roleName = data.newRole;
                        db.query(sql, roleName, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            const person = data.person;
                            const newRole = result[0].id;
                            const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?`;
                            db.query(sql, [newRole, person], (err, results) => {
                                if (err) {
                                    console.log(err);
                                }
                                cb();
                            })

                        })
                    })
            })
        }
        catch (error) {
            console.log(error)
        }

    }
    followQueries();
}


module.exports = { viewAllRoles, addNewRole, updateRole }