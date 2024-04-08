#GARAGE MODULE - VANSH
CREATE TABLE garage_master(
	id INT PRIMARY KEY AUTO_INCREMENT,
  garage_name VARCHAR(255) NOT NULL,
  contact_number VARCHAR(10) CHECK(LENGTH(contact_number) = 10) NOT NULL ,
  email VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255) DEFAULT NULL,
  open_time TIMESTAMP NOT NULL,
  close_time TIMESTAMP NOT NULL,
  status BOOLEAN DEFAULT 1,
  description VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE owner_has_garages(
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT REFERENCES users(id),
  garage_id INT REFERENCES garage_master(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
#APOINTMENTS & SLOTS & SERVICES - SHAILESH
CREATE TABLE slot_master(
  id INT PRIMARY KEY AUTO_INCREMENT,
  garage_id INT,
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP NOT NULL,
  availability_status BOOL DEFAULT 0,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY(garage_id) REFERENCES garage_master(garage_id)
);

CREATE TABLE appointments(
  appointment_id INT PRIMARY KEY AUTO_INCREMENT,
  slot_id INT,
  customer_id INT,
  status BOOL DEFAULT 0,
  comment VARCHAR(50),
  FOREIGN KEY(slot_id) REFERENCES slot_master(slot_id),
  FOREIGN KEY(customer_id) REFERENCES users(user_id)
);

CREATE TABLE appointment_payments(
  id INT PRIMARY KEY AUTO_INCREMENT,
  appointment_id INT,
  type VARCHAR(50) NOT NULL,
  status BOOL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(appointment_id) REFERENCES appointments(appointment_id)
);

CREATE TABLE service_id(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(150) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  availability_status BOOL DEFAULT 0
);

CREATE TABLE appointment_services(
  id INT PRIMARY KEY AUTO_INCREMENT,
  service_id INT,
  appointment_id INT,
  FOREIGN KEY(service_id) REFERENCES service_master(service_id),
  FOREIGN KEY(appointment_id) REFERENCES appointments(appointment_id)
);
#VEHICAL MODULE - GANPAT PARMAR
CREATE TABLE vehicle_master (
  id INT AUTO_INCREMENT,
  type_id INT  NOT NULL,
  brand VARCHAR(250) DEFAULT NULL,
  model VARCHAR(250) NOT NULL,
  year year DEFAULT NULL,
  createdtime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (type_id) REFERENCES vehicle_type(id)
)

CREATE TABLE vehicle_types (
    id INT AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE user_has_vehicles(
    id INT AUTO_INCREMENT,
    owner_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    register_plate_number VARCHAR(250) NOT NULL,
    createdtime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES users(id)
)

CREATE TABLE vehicle_condition (
    id INT AUTO_INCREMENT,
    condition_image VARCHAR(255) NOT NULL,
    description VARCHAR(250) DEFAULT NULL,
    vehicle_id INT NOT NULL
    PRIMARY KEY (id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicle_master(id)
) 
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
    city_id int not null,
    area varchar(255) not null,
    pincode varchar(255) not null CHECK(LENGTH(pincode) > 6),
    created_at timestamp default current_timestamp,
    updated_at timestamp on update current_timestamp,
	foreign key(city_id) references city_master(id),
    foreign key(resident_id) references users(id),
    primary key(id)
);
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
