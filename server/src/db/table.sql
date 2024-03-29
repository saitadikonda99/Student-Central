-- create a db with name sacdb

CREATE DATABASE IF NOT EXISTS sacdb;

-- use the db

USE sacdb;


-- Create a table named users
CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_verified INT(11) NOT NULL DEFAULT 0,
    role VARCHAR(255) NOT NULL DEFAULT 'Student',
    refresh_token VARCHAR(255) DEFAULT NULL,   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Create a table named user_details
CREATE TABLE IF NOT EXISTS user_details (
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    branch VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    residence VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create a table named club_reg
CREATE TABLE IF NOT EXISTS club_reg (
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(11),
    club_id INT(11) NOT NULL UNIQUE,
    why TEXT NOT NULL,
    club_domain VARCHAR(255) NOT NULL,
    resume_link VARCHAR(255) NOT NULL,
    preknowledge VARCHAR(255) NOT NULL,
    acceptance VARCHAR(255) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create a table named club
CREATE TABLE IF NOT EXISTS club (
    id INT(11) NOT NULL AUTO_INCREMENT,
    club_name VARCHAR(255) NOT NULL,
    club_logo LONGTEXT NOT NULL, -- Change data type to LONGTEXT
    club_domain VARCHAR(255) NOT NULL,
    skillset_one VARCHAR(255) NOT NULL,
    skillset_two VARCHAR(255) NOT NULL,
    skillset_three VARCHAR(255) NOT NULL,
    skillset_four VARCHAR(255) NOT NULL,
    skillset_five VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    club_desc LONGTEXT NOT NULL, -- Change data type to LONGTEXT
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


-- log the data 

CREATE TABLE IF NOT EXISTS logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    branch VARCHAR(255) NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    logout_time DATETIME
);


CREATE TABLE IF NOT EXISTS grievances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    response TEXT,
    status VARCHAR(255) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);