USE employee_tracker_db;

INSERT INTO department (id, department_name)
VALUES (1, 'Management');

INSERT INTO department (id, department_name)
VALUES (2, 'Legal');

INSERT INTO department (id, department_name)
VALUES (3, 'Engineering');

INSERT INTO department (id, department_name)
VALUES (4, 'Finance');


INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Senior Manager', 200000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, 'Lawer', 175000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, 'Accountant', 80000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, 'Software Engineer', 150000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, 'Senior Lead', 150000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, 'Paralegal', 100000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, 'Finance Manager', 90000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, 'Project Manager', 100000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, 'Auditor', 60000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (10, 'Desk Cleark', 40000, 2);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Francis', 'Aguinaldo', 8, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, 'Starr', 'Gacula', 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, 'Lyanna', 'Stark', 2, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, 'Damien', 'Ryan', 6, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, 'Jackson', 'Black', 4, 1;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, 'Kira', 'Day', 3, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, 'Alex', 'Cruz', 7, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, 'Frances', 'Kim', 5, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, 'Amy', 'Akers', 10, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, 'Nick', 'Santos', 9, 7);