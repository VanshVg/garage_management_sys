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