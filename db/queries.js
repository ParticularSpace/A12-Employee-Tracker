const connection = require('./conection.js');


const getAllDepartments = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM departments';
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const addDepartment = (departmentName) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO departments SET ?';
        connection.query(query, { name: departmentName }, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const addRole = (role) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO roles SET ?';
        connection.query(query, { title: role.title, salary: role.salary, department_id: role.department_id }, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const addEmployee = (employee) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO employees SET ?';
        connection.query(query, { first_name: employee.first_name, last_name: employee.last_name, role_id: employee.role_id, manager_id: employee.manager_id }, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const updateEmployeeRole = (employee) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
        connection.query(query, [employee.role_id, employee.id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const updateEmployeeManager = (employee) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE employees SET manager_id = ? WHERE id = ?';
        connection.query(query, [employee.manager_id, employee.id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getEmployeesByDepartment = (departmentId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM employees WHERE role_id IN (SELECT id FROM roles WHERE department_id = ?)';
        connection.query(query, [departmentId], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getAllRoles = () => {

};

const getAllEmployees = () => {

};

const deleteDepartment = (departmentId) => {

};

const deleteRole = (roleId) => {

};

const deleteEmployee = (employeeId) => {

};

const viewDepartmentBudgets = () => {
    
};






module.exports = {
    getAllDepartments,
    addDepartment,
    getAllRoles,
    addRole,
    getAllEmployees,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    getEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    viewDepartmentBudgets,
};


