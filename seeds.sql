SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO departments (name)
VALUES ("Engineers"),
       ("Partier"),
       ("Walker"),
       ("PRs"),
       ("HR"),
       ("Sales"),
       ("Marketing"),
       ("Accounting"),
       ("Finance"),
       ("Legal"),
       ("IT"),
       ("Customer Service"),
       ("Security"),
       ("Maintenance"),
       ("Janitor");


INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1),
       ("Party Pro", 70000, 2),
       ("Space Walker", 60000, 3),
       ("PR Specialist", 95000, 4),
       ("HR", 45000, 5),
       ("Sales", 75000, 6),
       ("Marketing", 85000, 7),
       ("Accounting", 55000, 8),
       ("Finance", 65000, 9),
       ("Legal", 85000, 10),
       ("IT", 75000, 11),
       ("Customer Service", 45000, 12),
       ("Security", 55000, 13),
       ("Maintenance", 65000, 14),
       ("Janitor", 35000, 15);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Jones", 1, NULL),
       ("Alison", "Ward", 2, 1),
       ("Chayse", "Jones", 3, 1),
       ("Eli", "Bro", 4, 1),
       ("Bob", "Smith", 1, 2),
       ("Sally", "Smith", 2, 2),
       ("Joe", "Smith", 3, 2),
       ("John", "Smith", 4, 2),
       ("Sally", "Jones", 1, 3),
       ("Joe", "Jones", 2, 3),
       ("John", "Jones", 3, 3),
       ("Sam", "Jones", 4, 3),
       ("Sally", "Bro", 1, 4),
       ("Joe", "Bro", 2, 4),
       ("John", "Bro", 3, 4),
       ("Sam", "Bro", 4, 4);



       