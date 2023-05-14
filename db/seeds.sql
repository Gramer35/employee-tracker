INSERT INTO department (name)
VALUES ('S.H.I.E.L.D'),
('Outer Space'),
('Magic'),
('New York'),
('New Asgard'),
('Wakanda');

INSERT INTO roles (title, department_id, salary)
VALUES ('SHIELD Director', 1, 300000.00),
('Guardians of the Galaxy, 2, 100000'),
('Scarlett Witch', 3, 120000),
('Hulk', 5, 110000),
('Black Panther', 6, 250000),
('Captain America', 4, 250000),
('Iron Man', 4, 100000000),
('Spider-Man', 4, 50000),
('Ant-Man', 4, 90000),
('DareDevil', 4, 90000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nick', 'Fury', 1, 1),
('Peter', 'Quill', 2, 2),
('Gamora', '', 2, 2),
('Rocket', 'Racoon', 2, 2),
('Groot', '', 2, 2),
('Peter', 'Parker', 8, 8),
('Tony', 'Stark', 7, 7),
("T'Challa", '', 5, 5),
('Steve', 'Rogers', 6, 6),
('Bruce', 'Banner', 4, 4);


