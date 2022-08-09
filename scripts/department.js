const inquirer = require('inquirer');
require("console.table");
require("dotenv").config()

function viewDep(db, cb) {
    db.query("SELECT id, depName AS department FROM department", function (err, results) {
        if (err) {
            console.log(err)
        }
        console.table(results);
        cb();
    })
};

function newDep(db, cb) {
    inquirer
        .prompt(
            {
                type: "input",
                message: "What is the name of the department you wat to add?",
                name: "names"
            })
        .then(
            (data) => {
                const depname = data.names
                const sql = "INSERT INTO department (depName) VALUES (?)";
                db.query(sql, depname, function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    cb();
                })
            }
        )
};

module.exports = { viewDep, newDep };