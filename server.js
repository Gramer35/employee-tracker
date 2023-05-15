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

};


function addRole(){

};


function addEmployee(){

};


function updateEmployeeRole(){

};