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

// Prompt the user for a new department name and then add it to the database
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

// Prompt user to view all roles
const viewAllRoles = async () => {
    const roles = await getAllRoles();
    console.table(roles);
    mainMenu();
  };
  
  // Prompt the user for a new role name and then add it to the database
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

  // Prompt user to view all employees
    const viewAllEmployees = async () => {
        const employees = await getAllEmployees();
        console.table(employees);
    };

    // Prompt the user for a new employee name and then add it to the database
    const addEmployee = async () => {
        const roles = await getAllRoles();
        const employees = await getAllEmployees();

        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the new employee first name:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the new employee last name:',
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Choose the role for this employee:',
                choices: roles.map((role) => ({
                    name: role.title,
                    value: role.id,
                })),
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Choose the manager for this employee:',
                choices: employees.map((employee) => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                })),
            },
        ]);

        await addEmployee(firstName, lastName, roleId, managerId);
        console.log('Employee added successfully!');
        mainMenu();
    };

    const updateEmployeeRole = async () => {
      const employees = await getAllEmployees();
      const roles = await getAllRoles();
    
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee whose role you want to update:',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          type: 'list',
          name: 'newRoleId',
          message: 'Select the new role for the employee:',
          choices: roles.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
      ]);
    
      await updateEmployeeRole(employeeId, newRoleId);
      console.log('Employee role updated successfully!');
      mainMenu();
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
