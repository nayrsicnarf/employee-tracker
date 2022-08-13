const inquirer = require('inquirer');
require("console.table");
// require("dotenv").config()

function viewAllDepartments(db, cb) {
    db.query("SELECT id, department_name AS department FROM department", function (err, results) {
        if (err) {
            console.log(err)
        }
        console.table(results);
        cb();
    })
};

function addNewDepartment(db, cb) {
    inquirer
        .prompt(
            {
                type: "input",
                message: "What is the name of the department you want to add?",
                name: "names"
            })
        .then(
            (data) => {
                const depname = data.names
                const sql = "INSERT INTO department (department_name) VALUES (?)";
                db.query(sql, depname, function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    cb();
                })
            }
        )
};

module.exports = { viewAllDepartments, addNewDepartment };