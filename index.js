require('dotenv').config();
import('inquirer').then(({ default: inquirer }) => {

    const {
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
    } = require('./db/queries');
    
    
// Begin the application and give our choices
const mainMenu = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View Employees By Department',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'View Department Budgets',
        'Exit'
      ],
    },
  ]);

  // Call the appropriate function depending on what the user chose
  switch (choice) {
    case 'View All Departments':
      return viewAllDepartments();
    case 'Add Department':
      return addNewDepartment();
    case 'View All Roles':
        return viewAllRoles();
    case 'Add Role':
        return addNewRole();
    case 'View All Employees':
        return viewAllEmployees();
    case 'Add Employee':
        return addEmployee();
    case 'Update Employee Role':
        return updateEmployeeRole();
    case 'Update Employee Manager':
        return updateEmployeeManager();
    case 'View Employees By Department':
        return getEmployeesByDepartment();
    case 'Delete Department':
        return deleteDepartment();
    case 'Delete Role':
        return deleteRole();
    case 'Delete Employee':
        return deleteEmployee();
    case 'View Department Budgets':
        return viewDepartmentBudgets();
    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
  }
};

// Call the mainMenu function to start the application
const viewAllDepartments = async () => {
  const departments = await getAllDepartments();
  console.table(departments);
  mainMenu();
};

const addNewDepartment = async () => {
  const { departmentName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the new department name:',
    },
  ]);

  await addDepartment(departmentName);
  console.log('Department added successfully!');
  mainMenu();
};

const viewAllRoles = async () => {
    const roles = await getAllRoles();
    console.table(roles);
    mainMenu();
  };
  
  const addNewRole = async () => {
    
    const departments = await getAllDepartments();
  
    const { title, salary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the new role title:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for this role:',
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Choose the department for this role:',
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);
  
    await addRole(title, salary, departmentId);
    console.log('Role added successfully!');
    mainMenu();
  };
  
    const viewAllEmployees = async () => {
        const employees = await getAllEmployees();
        console.table(employees);
    };

    const addEmployee = async () => {

    };

    const updateEmployeeRole = async () => {

    };

    const updateEmployeeManager = async () => {

    };

    const getEmployeesByDepartment = async () => {

    };

    const deleteDepartment = async () => {

    };

    const deleteRole = async () => {

    };

    const deleteEmployee = async () => {

    };

    const viewDepartmentBudgets = async () => {

    };

    
mainMenu();

});
