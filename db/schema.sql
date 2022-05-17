DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR(30) -- to hold department name
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30), -- to hold role title
    salary DECIMAL, -- to hold salary
    department_id INT NOT NULL -- to hold reference to department role belongs to
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30), -- to hold employee first name
    last_name VARCHAR(30), -- to hold employee last name
    role_id INT NOT NULL, -- to hold reference to employee role
    manager_id INT NULL -- to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
);