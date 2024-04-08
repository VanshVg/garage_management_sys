CREATE TABLE `vehicle_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int  NOT NULL,
  `brand` varchar(250) DEFAULT NULL,
  `model` varchar(250) NOT NULL,
  `year` year DEFAULT NULL,
  `createdtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (type_id) REFERENCES vehicle_type(id)
)

CREATE TABLE `vehicle_types` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(250) NOT NULL,
    PRIMARY KEY (`id`)
)

CREATE TABLE `user_has_vehicles`(
    `id` int NOT NULL AUTO_INCREMENT,
    `owner_id` int NOT NULL,
    `vehicle_id` int NOT NULL,
    `register_plate_number` varchar(250) NOT NULL,
    `createdtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
  FOREIGN KEY (owner_id) REFERENCES users_master(id)
)

CREATE TABLE `vehicle_condition` (
    `id` int NOT NULL AUTO_INCREMENT,
    `condition_image` LONGBLOB NOT NULL,
    `description` varchar(250) DEFAULT NULL,
    `vehicle_id` int NOT NULL
    PRIMARY KEY (id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicle_master(id)
) 