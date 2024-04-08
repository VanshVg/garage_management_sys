CREATE TABLE payment_master(
id INT PRIMARY KEY auto_increment,
gst_amount DECIMAL(10,2),
sub_total DECIMAL(10,2),
discount_per DECIMAL(10,2),
discount DECIMAL(10,2),
appointment_id INT,
FOREIGN KEY(appointment_id) REFERENCES appointments.id,
status bool,
type VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE feedbacks(
id INT PRIMARY KEY  auto_increment,
garage_id INT,
FOREIGN KEY(garage_id) REFERENCES garage_master.id,
customer_id INT,
FOREIGN KEY(customer_id) REFERENCES users.id,
feedback VARCHAR(255),
ratings DECIMAL(10,2),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);