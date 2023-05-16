const mysql = require('mysql2');
const inquirer = require('inquirer');
const utils = require('util');

// Creates a connection with mysql 
const dbConnect = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employeesData'
});

// creates a promise with mysql
dbConnect.query = utils.promisify(dbConnect.query);

// connects to mysql
dbConnect.connect((err) => {
    if (err) throw err;

    dbQuestions();
});

// list of options for the user to select form
async function dbQuestions() {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'dbQuestions',
        message: 'Please select an option',
        choices: [
            'View all Departments',
            'View all Roles',
            'View all Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role'
        ],
    })

    // Depending on the users selection, the corresponding function will populate
    switch (answer.dbQuestions) {
        case 'View all Departments':
            viewDepartments();
            break;
        case 'View all Roles':
            viewRoles();
            break;
        case 'View all Employees':
            viewEmployees();
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update an Employee Role':
            updateEmployeeRole();
            break;
    };
};

// Allows the user to view all departments under the employeesData database
async function viewDepartments() {
    const sql = 'SELECT * FROM department';
    try {
        
        const table = await dbConnect.query(sql)
        console.table(table);
        dbQuestions();
        
    } catch (err) {
        console.error('Error viewing Departments')
        dbQuestions();
    }
};


// Allows the user to view all roles under the employeesData database
async function viewRoles() {
    const sql = 'SELECT title, department_id, salary, department.dept_name FROM roles JOIN department ON roles.department_id = department.id';
    try {
        
        const table = await dbConnect.query(sql);
        console.table(table);
        dbQuestions();
    } catch (err) {
        console.error('Error viewing Roles:', err);
        dbQuestions();
    }
};

// Allows the user to view all employees under the employeesData database
async function viewEmployees() {
    const sql = 'SELECT first_name, last_name, roles.title FROM employee JOIN roles ON employee.role_id = roles.id';
    try {
        const table = await dbConnect.query(sql)
        console.table(table);
        dbQuestions();
    } catch (err) {
        console.error('Error viewing Employees', err);
        dbQuestions();
    }
};


// Allows the user to add a department table under employeesData database
async function addDepartment() {
    const deptAddition = await inquirer.prompt({
        type: 'input',
        name: 'newDept',
        message: 'What is the new department name?'
    });
    
    const sql = `INSERT INTO department (dept_name) VALUES (?)`;
    const table = await dbConnect.query(sql, [
        deptAddition.newDept
    ]);
    console.table(table);
    dbQuestions();
};


// Allows the user to add a role table under employeesData database
async function addRole() {
    const roleAddition = await inquirer.prompt([{
        type: 'input',
        name: 'newRole',
        message: 'What is the name of the Role?'
    },
    {
        type: 'input',
        name: 'dept',
        message: 'What department does the role belong to?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the new role?'
    }]);
    
    const sql = `INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)`;
    const table = await dbConnect.query(sql, [
        roleAddition.newRole,
        roleAddition.dept,
        roleAddition.salary
    ]);
    console.table(table);
    dbQuestions();
    
};


// Allows the user to add an employee table under employeesData database
async function addEmployee() {
    const empAddition = await inquirer.prompt([{
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the first name of the new Employee?'
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the last name of the new Employee'
    },
    {
        type: 'input',
        name: 'roleId',
        message: "What is the Employee's role ID?"
    }]);
    
    const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
    
    const table = await dbConnect.query(sql, [
        empAddition.employeeFirstName,
        empAddition.employeeLastName,
        empAddition.roleId,
    ]);
    console.table(table);
    dbQuestions();
    
};


// Allows the user to update an employee's role within the employee table under employeesData database
async function updateEmployeeRole() {
    const sqlEmployees = 'SELECT * FROM employee';
    const sqlRoles = 'SELECT * FROM roles';

    const employees = await dbConnect.query(sqlEmployees);

    const { employeeID } = await inquirer.prompt({
        name: 'employeeID',
        type: 'list',
        choices: employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        })),
    });

    const roles = await dbConnect.query(sqlRoles);
    const { roleID } = await inquirer.prompt({
        name: 'roleID',
        type: 'list',
        choices: roles.map((role) => ({
            name: role.title,
            value: role.id
        })),
    });

    await dbConnect.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleID, employeeID]);

    viewEmployees();
};