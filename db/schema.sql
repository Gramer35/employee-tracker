CREATE DATABASE employeesData;

USE employeesData;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO INCREMENT,
    title VARCHAR(50),
    department_id INT,
    salary DECIMAL(10,2),
    PRIMARY KEY(id),
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    -- necessary?
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO INCREMENT,
    first_name VARCHAR(50),
    last_name CARCHAR(50),
    role_id INT,
    manager_id INT,
    FOREIGN KEY(role_id)
    REFERENCES roles(id)
    -- necessary?
    ON DELETE SET NULL,
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    -- necessary?
    ON DELETE SET NULL
)