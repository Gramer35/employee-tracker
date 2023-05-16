-- Start by creating a new database
CREATE DATABASE employeesData;

-- This will focus on the specific database, employeesData
USE employeesData;

-- Creating a table within employeeData called department. Department has an id and a dept_name
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

-- Creating a table within employeeData called roles. This table  has an id, title, department_id and salary. The table also uses a Foreign key referencing department
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50),
    department_id INT,
    salary DECIMAL(10,2),
    PRIMARY KEY(id),
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- Creating a table within employeeData called employee. This table  has an id, first_name, last_name role_id and manager_id. The table also uses a Foreign key referencing role.
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL

);