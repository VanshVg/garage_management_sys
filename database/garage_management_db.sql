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