#VEHICAL MODULE - GANPAT PARMAR
CREATE TABLE `vehicle_master` (
  `id` INT AUTO_INCREMENT,
  `type_id` INT  NOT NULL,
  `brand` VARCHAR(250) DEFAULT NULL,
  `model` VARCHAR(250) NOT NULL,
  `year` year DEFAULT NULL,
  `createdtime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (type_id) REFERENCES vehicle_type(id)
)

CREATE TABLE `vehicle_types` (
    `id` INT AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    PRIMARY KEY (`id`)
)

CREATE TABLE `user_has_vehicles`(
    `id` INT AUTO_INCREMENT,
    `owner_id` INT NOT NULL,
    `vehicle_id` INT NOT NULL,
    `register_plate_number` VARCHAR(250) NOT NULL,
    `createdtime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
  FOREIGN KEY (owner_id) REFERENCES users(id)
)

CREATE TABLE `vehicle_condition` (
    `id` INT AUTO_INCREMENT,
    `condition_image` VARCHAR(255) NOT NULL,
    `description` VARCHAR(250) DEFAULT NULL,
    `vehicle_id` INT NOT NULL
    PRIMARY KEY (id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicle_master(id)
) 
==============================================================
#PAYMENT & FEEDBACK MODULE - JEEL PATEL
CREATE TABLE payment_master(
    id INT PRIMARY KEY AUTO_INCREMENT,
    gst_amount DECIMAL(10,2) NOT NULL,
    sub_total DECIMAL(10,2) NOT NULL,
    discount_per DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    appoINTment_id INT NOT NULL,
    status bool DEFAULT 0,
    type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(appoINTment_id) REFERENCES appoINTments.id
);

CREATE TABLE feedbacks(
    id INT PRIMARY KEY AUTO_INCREMENT,
    garage_id INT NOT NULL,
    customer_id INT NOT NULL,
    feedback VARCHAR(255) NOT NULL,
    ratings DECIMAL(10,2) DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(garage_id) REFERENCES garage_master.id,
    FOREIGN KEY(customer_id) REFERENCES users.id
);
============================================================================
#AUTHENTICATION MODULE - MAKWANA BHARAT
CREATE  TABLE roles(    
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE  TABLE permissions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE  TABLE role_has_permissions(
    role_id INT REFERENCES roles(id),
    permission_id INT REFERENCES permissions(id),
    CONSTRAINT role_permission_pk PRIMARY KEY (role_id,permission_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
#Auth Module

CREATE  TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_id INT REFERENCES roles(id),
    name VARCHAR(20) DEFAULT NULL,
    profile_pic VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    activate_link VARCHAR(1000) NOT NULL,
    password_exp TIMESTAMP NOT NULL,
    link_exp TIMESTAMP NOT NULL,
    is_active boolean DEFAULT 1,
    is_verifed boolean DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE  TABLE login_logs(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT REFERENCES users(id) , 
    attempt_count INT NOT NULL DEFAULT 1,
    attempt_sys_ip VARCHAR(16) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE  TABLE password_change_logs(
    user_id INT REFERENCES users(id) ,
    password VARCHAR(256) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE  TABLE email_change_logs(
    user_id INT REFERENCES users(id) ,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER user_trigger BEFORE INSERT ON users 
FOR EACH ROW SET
    NEW.password_exp = TIMESTAMPADD(DAY, 10, CURRENT_TIMESTAMP),
    NEW.link_exp = TIMESTAMPADD(HOUR, 2, CURRENT_TIMESTAMP);
>>>>>>> database/garage_management_db.sql
