// const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// const PORT = process.env.PORT || 3001;
// const app = express();

const dbConnect = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employeesData'
});

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
        const sql = `INSERT INTO department (dept_name) VALUES ('${answer.newDept}')`;
        dbConnect.query(sql, (err, res) => {
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
        const sql = `INSERT INTO roles (title, department_id, salary) VALUES ('${answer.newRole}', '${answer.dept}', '${answer.salary}')`;
        dbConnect.query(sql, (err, res) => {
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
        const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.employeeFirstName}', '${answer.employeeLastName}', '${answer.roleId}')`;
        dbConnect.query(sql, (err, res) => {
            if (err) throw err;
            console.table(res);
        
            dbQuestions();
        });
    });
};


function updateEmployeeRole(){
    // Pull list of employees
    const sqlEmployees = 'SELECT * FROM employee';
    const sqlRoles = 'SELECT * FROM roles';
    // Select Employee
    // Change their role from list of roles

};