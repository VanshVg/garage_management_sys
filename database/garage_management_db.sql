CREATE TABLE SLOT_MASTER(
  ID INT PRIMARY KEY AUTO_INCREMENT,
  GARAGE_ID INT,
  START_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  END_TIME TIMESTAMP NOT NULL,
  AVAILABILITY_STATUS BOOL DEFAULT 0,
  CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  MODIFIED_AT TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY(GARAGE_ID) REFERENCES GARAGE_MASTER(GARAGE_ID)
);

CREATE TABLE APPOINTMENTS(
  APPOINTMENT_ID INT PRIMARY KEY AUTO_INCREMENT,
  SLOT_ID INT,
  CUSTOMER_ID INT,
  STATUS BOOL DEFAULT 0,
  COMMENT VARCHAR(50),
  FOREIGN KEY(SLOT_ID) REFERENCES SLOT_MASTER(SLOT_ID),
  FOREIGN KEY(CUSTOMER_ID) REFERENCES USERS(USER_ID)
);

CREATE TABLE APPOINTMENT_PAYMENTS(
  ID INT PRIMARY KEY AUTO_INCREMENT,
  APPOINTMENT_ID INT,
  TYPE VARCHAR(50) NOT NULL,
  STATUS BOOL DEFAULT 0,
  CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(APPOINTMENT_ID) REFERENCES APPOINTMENTS(APPOINTMENT_ID)
);

CREATE TABLE SERVICE_MASTER(
  ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(50) NOT NULL,
  DESCRIPTION VARCHAR(150) NOT NULL,
  PRICE DECIMAL(10, 2) NOT NULL,
  AVAILABILITY_STATUS BOOL DEFAULT 0
);

CREATE TABLE APPOINTMENT_SERVICES(
  ID INT PRIMARY KEY AUTO_INCREMENT,
  SERVICE_ID INT,
  APPOINTMENT_ID INT,
  FOREIGN KEY(SERVICE_ID) REFERENCES SERVICE_MASTER(SERVICE_ID),
  FOREIGN KEY(APPOINTMENT_ID) REFERENCES APPOINTMENTS(APPOINTMENT_ID)
);
