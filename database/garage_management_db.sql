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
