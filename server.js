// const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const utils = require('utils');

// const PORT = process.env.PORT || 3001;
// const app = express();

const dbConnect = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'F!nN3@s731',
    database: 'employeesData'
});

dbConnect.query = utils.promisify(dbConnect.query);

dbConnect.connect((err) => {
    if (err) throw err;

    dbQuestions();
});

function dbQuestions() {
    inquirer.prompt ({
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
    .then((answer) => {
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
        }
    });
}

function viewDepartments(){
    const sql = 'SELECT * FROM department';
    dbConnect.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);

        dbQuestions();
    });
};

function viewRoles(){
    const sql = 'SELECT * FROM roles';
    dbConnect.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
    
        dbQuestions();
    });
};


function viewEmployees(){
    const sql = 'SELECT * FROM employee';
    dbConnect.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
    
        dbQuestions();
    });
    
};


function addDepartment(){
    inquirer.prompt({
        type: 'input',
        name: 'newDept',
        message: 'What is the new department name?'
    })
    .then((answer) => {
        const sql = `INSERT INTO department (dept_name) VALUES (?)`;
        dbConnect.query(sql, [answer.newDept], (err, res) => {
            if (err) throw err;
            console.table(res);
        
            dbQuestions();
        });
    });
};


function addRole(){
    inquirer.prompt([{
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
    }])
    .then((answer) => {
        const sql = `INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)`;
        dbConnect.query(sql, [answer.newrole, answer.dept, answer.salary], (err, res) => {
            if (err) throw err;
            console.table(res);
        
            dbQuestions();
        });
    });
};


function addEmployee(){
    inquirer.prompt([{
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
    }])
    .then((answer) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
        dbConnect.query(sql, [answer.employeeFirstName, answer.employeeLastName, answer.roleId], (err, res) => {
            if (err) throw err;
            console.table(res);
        
            dbQuestions();
        });
    });
};


async function updateEmployeeRole(){
    // Pull list of employees
    const sqlEmployees = 'SELECT * FROM employee';
    const sqlRoles = 'SELECT * FROM roles';
    // Select Employee
    // Change their role from list of roles
    const sql = 'update employees set role_id = ? where id = ?';
    
    // FInd and list all employees - This is going to let the user select who they want to update
    const employees = await dbConnect.query(sqlEmployees);

    const {employeeID} = await inquirer.prompt({
        name: 'employeeID',
        type: 'list',
        choices: employees.map (employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        })),
    });
    // Once user selects employee, we want to save employee id
    // we then need to list all of th eroles to the user and let them selver which role they want to assign 
    const roles = await dbConnect.query(sqlRoles);
    const {roleID} = await inquirer.prompt({
        name: 'roleID',
        type: 'list',
        choices: roles.map((role) => ({
            name: role.title,
            value: role.id
        })),
    });

    await dbConnect.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleID, employeeID])
    // then take user id and the new role id and update our user


    // dbConnect.query(sqlEmployees, (err, res) => {

    // })
};