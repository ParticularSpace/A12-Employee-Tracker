require('dotenv').config();

(async () => {
  const { default: inquirer } = await import('inquirer');

// Rest of the code


    const {
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
        return addNewRolePrompt();
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
  const departments = await getAllDepartments();
  console.table(departments);
  mainMenu();
};

// Prompt the user for a new department name and then add it to the database
const addNewDepartmentPrompt = async () => {
  const { departmentName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the new department name:',
    },
  ]);

  await addDepartmentPrompt(departmentName);
  console.log('Department added successfully!');
  mainMenu();
};

// Prompt user to view all roles
const viewAllRolesPrompt = async () => {
    const roles = await getAllRolesPrompt();
    console.table(roles);
    mainMenu();
  };
  
  // Prompt the user for a new role name and then add it to the database
  const addNewRolePrompt = async () => {
    
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
  
    await addRolePrompt(title, salary, departmentId);
    console.log('Role added successfully!');
    mainMenu();
  };

  // Prompt user to view all employees
    const viewAllEmployees = async () => {
        const employees = await getAllEmployeesPrompt();
        console.table(employees);
    };

    // Prompt the user for a new employee name and then add it to the database
    const addNewEmployee = async () => {
        const roles = await getAllRoles();
        const employees = await getAllEmployeesPrompt();

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

        await addEmployeePrompt(firstName, lastName, roleId, managerId);
        console.log('Employee added successfully!');
        mainMenu();
    };

    const updateEmployeeRolePrompt = async () => {
      const employees = await getAllEmployeesPrompt();
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
    
      await updateEmployeeRolePrompt(employeeId, newRoleId);
      console.log('Employee role updated successfully!');
      mainMenu();
    };

    const updateEmployeeManagerPrompt = async () => {
      const employees = await getAllEmployeesPrompt();

      const { employeeId, newManagerId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee whose manager you want to update:',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          type: 'list',
          name: 'newManagerId',
          message: 'Select the new manager for the employee:',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
      ]);
    
      await updateEmployeeManagerPrompt(employeeId, newManagerId);
      console.log('Employee manager updated successfully!');
      mainMenu();
    };

    const getEmployeesByDepartmentPrompt = async () => {
      const departments = await getAllDepartments();

      const { departmentId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department whose employees you want to view:',
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ]);
    
      const employees = await getEmployeesByDepartmentPrompt(departmentId);
      console.table(employees);
      mainMenu();
    };

    const deleteDepartmentPrompt = async () => {
      const departments = await getAllDepartmentsPrompt();

      const { departmentId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department you want to delete:',
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ]);
    
      await deleteDepartmentPrompt(departmentId);
      console.log('Department deleted successfully!');
      mainMenu();
    };

    const deleteRolePrompt = async () => {
      const roles = await getAllRoles();

      const { roleId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'roleId',
          message: 'Select the role you want to delete:',
          choices: roles.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
      ]);
    
      await deleteRolePrompt(roleId);
      console.log('Role deleted successfully!');
      mainMenu();
    };

    const deleteEmployeePrompt = async () => {
      const employees = await getAllEmployeesPrompt();

      const { employeeId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee you want to delete:',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
      ]);
    
      await deleteEmployeePrompt(employeeId);
      console.log('Employee deleted successfully!');
      mainMenu();
    };

    const viewDepartmentBudgetsPrompt = async () => {
      const departmentBudgets = await getDepartmentBudgets();
      console.table(departmentBudgets);
      mainMenu();
    };

    
mainMenu();

})();