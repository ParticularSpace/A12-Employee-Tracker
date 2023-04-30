const connection = require('./conection.js');

//Query to get all departments
const viewAllDepartments = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, name FROM departments';
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

//Query to add a department
const addDepartment = (department_name) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO departments SET ?';
        connection.query(query, { name: department_name }, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// query to get all roles
const viewAllRoles = () => {
    return new Promise((resolve, reject) => {
        const query = `
          SELECT roles.id, roles.title, roles.salary, departments.name AS department
          FROM roles
          JOIN departments ON roles.department_id = departments.id;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            results.forEach(row => {
                delete row.index;
            });
            resolve(results);
        });
    });
};

// Query to add roles
const addRole = (role) => {
    console.log('Role:', role);
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        connection.query(query, [role.title, role.salary, role.department_id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Query to get all employees
const viewAllEmployees = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                       FROM employees e
                       LEFT JOIN roles r ON e.role_id = r.id
                       LEFT JOIN departments d ON r.department_id = d.id
                       LEFT JOIN employees m ON e.manager_id = m.id`;
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to add a employee 
const addEmployee = (employee) => {
    console.log('employee:', employee);
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        connection.query(query, [employee.first_name, employee.last_name, employee.role_id, employee.manager_id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to update an employee's role
const updateEmployeeRole = (employee) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
        connection.query(query, [employee.role_id, employee.id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to update an employee's manager
const updateEmployeeManager = (employee_id, manager_id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE employees SET manager_id = ? WHERE id = ?';
        connection.query(query, [manager_id, employee_id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to get an employee by department
const getEmployeesByDepartment = (department_id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT * FROM employees WHERE role_id IN (SELECT id FROM roles WHERE department_id = ?)';
        connection.query(query, [department_id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to delete a department
const deleteDepartment = (department_id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM departments WHERE id = ?';
        connection.query(query, [department_id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to delete a role
const deleteRole = (role_id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM roles WHERE id = ?';
        connection.query(query, [role_id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to delete an employee
const deleteEmployee = (employee_id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM employees WHERE id = ?';
        connection.query(query, [employee_id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to view department budgets total salaries
const viewDepartmentBudgets = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT departments.id, departments.name, SUM(roles.salary) as budget FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON roles.id = employees.role_id GROUP BY departments.id, departments.name';
      connection.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  };
  

// Export all functions as methods to be used in index.js
module.exports = {
    viewAllDepartments,
    addDepartment,
    viewAllRoles,
    addRole,
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    getEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    viewDepartmentBudgets,
};


