-- create a db with name sacdb

CREATE DATABASE IF NOT EXISTS sacdb;

-- use the db

USE sacdb;


-- Create a table named users
CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'Student',
    refresh_token VARCHAR(255) DEFAULT NULL,   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO users (username, password, role, refresh_token) VALUES (
    '2200030805', 'sai@1234', 'Admin', null
);