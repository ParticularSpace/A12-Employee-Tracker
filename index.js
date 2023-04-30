require('dotenv').config();
const figlet = require('figlet');


(async () => {
  const { default: inquirer } = await import('inquirer');

    const asciiArt = figlet.textSync('Employee Tracker', {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 50,
      whitespaceBreak: true,
    });
  
    console.log(asciiArt);
    
  const {
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
        return viewAllDepartmentsPrompt();
      case 'Add Department':
        return addNewDepartmentPrompt();
      case 'View All Roles':
        return viewAllRolesPrompt();
      case 'Add Role':
        return addRolePrompt();
      case 'View All Employees':
        return viewAllEmployeesPrompt();
      case 'Add Employee':
        return addNewEmployeePrompt();
      case 'Update Employee Role':
        return updateEmployeeRolePrompt();
      case 'Update Employee Manager':
        return updateEmployeeManagerPrompt();
      case 'View Employees By Department':
        return getEmployeesByDepartmentPrompt();
      case 'Delete Department':
        return deleteDepartmentPrompt();
      case 'Delete Role':
        return deleteRolePrompt();
      case 'Delete Employee':
        return deleteEmployeePrompt();
      case 'View Department Budgets':
        return viewDepartmentBudgetsPrompt();
      case 'Exit':
        console.log('Goodbye!');
        process.exit(0);
    }
  };

  // Call the mainMenu function to start the application
  const viewAllDepartmentsPrompt = async () => {
    const departments = await viewAllDepartments();
    console.table(departments);
    mainMenu();
  };

  // Prompt the user for a new department name and then add it to the database
  const addNewDepartmentPrompt = async () => {
    const { department_name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'Enter the new department name:',
      },
    ]);

    await addDepartment(department_name);
    console.log('Department added successfully!');
    mainMenu();
  };

  // Prompt user to view all roles
  const viewAllRolesPrompt = async () => {
    const roles = await viewAllRoles();
    console.table(roles);
    mainMenu();
  };

  // Prompt the user for a new role name and then add it to the database
  const addRolePrompt = async () => {
    const departments = await viewAllDepartments();
    const { title, salary, department_id } = await inquirer.prompt([
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
        name: 'department_id',
        message: 'Choose the department for this role:',
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);
    try {
      await addRole({title, salary, department_id});
      console.log('Role added successfully!');
    } catch (error) {
      console.log('Error adding role:', error);
    }
    mainMenu();
  };
  

  // Prompt user to view all employees
  const viewAllEmployeesPrompt = async () => {
    try {
      const employees = await viewAllEmployees();
      console.table(employees);
      mainMenu();
    } catch (err) {
      console.log(err);
    }
  };


  // Prompt the user for a new employee name and then add it to the database
  const addNewEmployeePrompt = async () => {
    const roles = await viewAllRoles();
    const employees = await viewAllEmployees();

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the new employee first name:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the new employee last name:',
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Choose the role for this employee:',
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Choose the manager for this employee:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
    ]);

    await addEmployee({first_name, last_name, role_id, manager_id});
    console.log('Employee added successfully!');
    mainMenu();
  };

  const updateEmployeeRolePrompt = async () => {
    const employees = await viewAllEmployees();
    const roles = await viewAllRoles();
  
    const { employee_id, newRole_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee whose role you want to update:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: 'list',
        name: 'newRole_id',
        message: 'Select the new role for the employee:',
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);
  
    const employee = { id: employee_id, role_id: newRole_id };
    await updateEmployeeRole(employee);
    console.log('Employee role updated successfully!');
    mainMenu();
  };
  

  const updateEmployeeManagerPrompt = async () => {
    const employees = await viewAllEmployees();

    const { employee_id, manager_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee whose manager you want to update:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Select the new manager for the employee:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
    ]);

    await updateEmployeeManager(employee_id, manager_id);
    console.log('Employee manager updated successfully!');
    mainMenu();
  };

  const getEmployeesByDepartmentPrompt = async () => {
    const departments = await viewAllDepartments();

    const { department_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department whose employees you want to view:',
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);

    const employees = await getEmployeesByDepartment(department_id);
    console.table(employees);
    mainMenu();
  };

  const deleteDepartmentPrompt = async () => {
    const departments = await viewAllDepartments();

    const { department_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department you want to delete:',
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);

    await deleteDepartment(department_id);
    console.log('Department deleted successfully!');
    mainMenu();
  };

  const deleteRolePrompt = async () => {
    const roles = await viewAllRoles();

    const { role_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the role you want to delete:',
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);

    await deleteRole(role_id);
    console.log('Role deleted successfully!');
    mainMenu();
  };

  const deleteEmployeePrompt = async () => {
    const employees = await viewAllEmployees();

    const { employee_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee you want to delete:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
    ]);

    await deleteEmployee(employee_id);
    console.log('Employee deleted successfully!');
    mainMenu();
  };

  const viewDepartmentBudgetsPrompt = async () => {
    const departmentBudgets = await viewDepartmentBudgets();
    console.table(departmentBudgets);
    mainMenu();
  };


  mainMenu();

})();