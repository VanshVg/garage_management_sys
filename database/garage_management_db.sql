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
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) DEFAULT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    dob DATE,
    password VARCHAR(256) NOT NULL,
    activate_link VARCHAR(1000) NOT NULL,
    password_exp TIMESTAMP NOT NULL,
    link_exp TIMESTAMP NOT NULL,
    isactive boolean DEFAULT 1,
    isverifed boolean DEFAULT 0,
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
