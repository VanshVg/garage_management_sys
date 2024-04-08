#ADDRESS MODULE - NITIN
create table state_master(
	id int unique auto_increment,
    state_name varchar(255),
    primary key(id)
);

create table city_master(
	id int unique auto_increment,
    sid int,
    city_name varchar(255),
    Foreign key(sid) REFERENCES state_master(id),
    primary key(id)
);

create table address_master(
	id int unique auto_increment,
	resident_id int not null,
    state_id int not null,
    city_id int not null,
    area varchar(255) not null,
    pincode varchar(255) not null CHECK(LENGTH(pincode) > 6),
    created_at timestamp default current_timestamp,
    updated_at timestamp on update current_timestamp,
	foreign key(city_id) references city_master(id),
    foreign key(state_id) references state_master(id),
    foreign key(resident_id) references user_master(id),
    primary key(id)
);
=======================================
#PAYMENT & FEEDBACK MODULE - JEEL PATEL
CREATE TABLE payment_master(
    id INT PRIMARY KEY AUTO_INCREMENT,
    gst_amount DECIMAL(10,2) NOT NULL,
    sub_total DECIMAL(10,2) NOT NULL,
    discount_per DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    appointment_id INT NOT NULL,
    status bool DEFAULT 0,
    type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(appointment_id) REFERENCES appointments.id
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
