SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO departments (name)
VALUES ("Engineers"),
       ("Partier"),
       ("Walker"),
       ("PRs");


INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1),
       ("Party Pro", 70000, 2),
       ("Space Walker", 60000, 3),
       ("PR Specialist", 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Jones", 1, NULL),
       ("Alison", "Ward", 2, 1),
       ("Chayse", "Jones", 3, 1),
       ("Eli", "Bro", 4, 1);  



       