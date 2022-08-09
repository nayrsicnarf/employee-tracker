USE employee_tracker_db;

INSERT INTO department (department_name)
VALUES ("Management");

INSERT INTO department (department_name)
VALUES ("Legal");

INSERT INTO department (department_name)
VALUES ("Engineering");

INSERT INTO department (department_name)
VALUES ("Finance");


INSERT INTO employeeeRole (title, salary, department_id)
VALUES ("Senior Manager", 200000, 1);

INSERT INTO employeeRole (title, salary, department_id)
VALUES ("Lawyer", 175000, 2);

INSERT INTO employeeRole (title, salary, department_id)
VALUES ("Accountant", 80000, 4);

INSERT INTO employeeRole (title, salary, department_id)
VALUES ("Software Engineer", 150000, 3);

INSERT INTO employeeRole (title, salary, department_id)
VALUES ("Senior Lead", 150000, 1);

INSERT INTO employeeRole (title, salary, department_id)
VALUES ("Paralegal", 100000, 2);

INSERT INTO employeeRole (title, salary, department_id)
VALUES ("Finance Manager", 90000, 2);

INSERT INTO employeeRole (title, salary, department_id)
VALUES ("Project Manager", 100000, 3);

INSERT INTO employeeRole (title, salary, department_id)
VALUES ("Auditor", 60000, 3);

INSERT INTO employeeRole (title, salary, department_id)
VALUES ("Desk Cleark", 40000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Francis", "Aguinaldo", 8, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Starr", "Gacula", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lyanna", "Stark", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Damien", "Ryan", 6, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jackson", "Black", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kira", "Day", 3, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Cruz", 7, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Frances", "Kim", 5, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amy", "Akers", 10, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nick", "Santos", 9, 7);