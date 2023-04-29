const connection = require('./conection.js');

//Query to get all departments
const getAllDepartmentsPrompt = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM departments';
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

//Query to add a department
const addDepartmentPrompt = (departmentName) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO departments SET ?';
        connection.query(query, { name: departmentName }, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to get all roles
const addRolePrompt = (role) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO roles SET ?';
        connection.query(query, { title: role.title, salary: role.salary, department_id: role.department_id }, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to add a role
const addEmployeePrompt = (employee) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO employees SET ?';
        connection.query(query, { first_name: employee.first_name, last_name: employee.last_name, role_id: employee.role_id, manager_id: employee.manager_id }, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to update an employee's role
const updateEmployeeRolePrompt = (employee) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
        connection.query(query, [employee.role_id, employee.id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const updateEmployeeManagerPrompt = (employee) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE employees SET manager_id = ? WHERE id = ?';
        connection.query(query, [employee.manager_id, employee.id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to get all employees by department
const getEmployeesByDepartmentPrompt = (departmentId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM employees WHERE role_id IN (SELECT id FROM roles WHERE department_id = ?)';
        connection.query(query, [departmentId], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Query to get all roles
const getAllRolesPrompt = () => {

};

// Query to get all employees
const getAllEmployeesPrompt = () => {

};

// Query to delete a department
const deleteDepartmentPrompt = (departmentId) => {

};

// Query to delete a role
const deleteRolePrompt = (roleId) => {

};

// Query to delete an employee
const deleteEmployeePrompt = (employeeId) => {

};

// Query to view department budgets
const viewDepartmentBudgetsPrompt = () => {

};





// Export all functions as methods to be used in index.js
module.exports = {
    getAllDepartmentsPrompt,
    addDepartmentPrompt,
    getAllRolesPrompt,
    addRolePrompt,
    getAllEmployeesPrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt,
    updateEmployeeManagerPrompt,
    getEmployeesByDepartmentPrompt,
    deleteDepartmentPrompt,
    deleteRolePrompt,
    deleteEmployeePrompt,
    viewDepartmentBudgetsPrompt,
};


