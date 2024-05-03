import conn from "../config/dbConfig.js";
import logger from "winston";

// get user details with user id
export const findOneById = async (userId) => {
  try {
    let query = "SELECT * FROM users WHERE id = ?";
    let [results] = await conn.query(query, [userId]);
    let User = results;
    return User;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// verify user by email address
export const activateUser = async (userId) => {
  try {
    let query = "UPDATE users SET is_verified = 1 where id = ?";
    let [results] = await conn.query(query, [userId]);
    let User = results[0];
    return User;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// update user password
export const updatePassword = async (userId, password) => {
  try {
    let query = "UPDATE users SET password = ? where id = ?";
    let [results] = await conn.query(query, [password, userId]);
    let User = results[0];
    return User;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// insert user details
export const insert = async (UserInfo) => {
  try {
    let query = `INSERT INTO users ( role_id, name, email, password, activate_link) values (?)`;
    let results = await conn.query(query, [UserInfo]);
    return results[0].insertId;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// insert new slots
export const insertSlot = async (slotTime) => {
  try {
    let query = `INSERT INTO slot_master (garage_id,start_time,end_time,availability_status) values (?)`;
    let results = await conn.query(query, [slotTime]);
    return results[0].insertId;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// update existing slots
export const updateSlot = async (slotTime) => {
  try {
    let query = `UPDATE slot_master set start_time = ?,end_time = ? where id =?`;
    let results = await conn.query(query, [
      slotTime[0],
      slotTime[1],
      slotTime[2],
    ]);
    return results[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// change is deleted flag to true
export const deleteSlot = async (slotId) => {
  try {
    let query = `UPDATE slot_master set is_deleted = 1 where id = ?`;
    let results = await conn.query(query, [slotId]);
    return results[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get all slots of a garage
export const getAllSlots = async (offset, garage, user) => {
  try {
    let query = `SELECT slot_master.id, garage_master.garage_name as garageName, start_time, end_time, availability_status 
                 FROM slot_master 
                 LEFT JOIN  garage_master ON slot_master.garage_id = garage_master.id 
                 LEFT JOIN owner_has_garages ON owner_has_garages.garage_id = garage_master.id 
                 WHERE garage_master.garage_name LIKE ? and owner_has_garages.owner_id = ?  and slot_master.is_deleted = 0 limit ?, 10;
                 SELECT COUNT(slot_master.id) as count 
                 FROM slot_master 
                 LEFT JOIN  garage_master ON slot_master.garage_id = garage_master.id 
                 LEFT JOIN owner_has_garages ON owner_has_garages.garage_id = garage_master.id 
                 WHERE garage_master.garage_name LIKE ? and owner_has_garages.owner_id = ? and slot_master.is_deleted = 0`;
    let result = await conn.query(query, [
      "%" + garage + "%",
      user,
      offset,
      "%" + garage + "%",
      user,
    ]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// update user with email
export const updateUserByEmail = async (userInfo) => {
  try {
    let query = `UPDATE users SET name = ?, bio = ?, profile_pic=?  WHERE email = ?`;
    if (userInfo[2] == "") {
      query = `UPDATE users SET name = ?, bio = ? WHERE email = ?`;
      userInfo.splice(2, 1);
    }
    let results = await conn.query(query, userInfo);
    return results[0].affectedRows;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get all the states
export const getState = async () => {
  try {
    let query = `SELECT * FROM state_master`;
    let [results] = await conn.query(query);
    let state = results;
    return state;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get all the cities with state id
export const getCity = async (stateId) => {
  try {
    let query = `SELECT * FROM city_master where sid=?`;
    let [results] = await conn.query(query, [stateId]);
    let city = results;
    return city;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// find user address with user id
export const findAddressById = async (userId) => {
  try {
    let query = `SELECT * FROM user_address WHERE user_id = ?`;
    let [results] = await conn.query(query, [userId]);
    let address = results[0];
    return address;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// insert address into address master
export const insertAddress = async (userInfo) => {
  try {
    let query = `INSERT INTO address_master (city_id, area, pincode) VALUES (?)`;
    let results = await conn.query(query, [userInfo]);
    return results[0].insertId;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// add address id to user addresses
export const insertUserAddress = async (userInfo) => {
  try {
    let query = `INSERT INTO user_address (user_id, address_id) VALUES (?)`;
    let results = await conn.query(query, [userInfo]);
    return results[0].insertId;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// update address with id
export const updateAddressById = async (userInfo) => {
  try {
    let query = `UPDATE address_master SET city_id = ?, area = ?, pincode = ? WHERE id = ?`;
    let results = await conn.query(query, userInfo);
    return results[0].affectedRows;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// delete user address
export const deleteUserAddress = async (userInfo) => {
  try {
    let query = `DELETE FROM address_master WHERE user_id = ?`;
    let results = await conn.query(query, userInfo);
    return results[0].affectedRows;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// insert new garage
export const insertGarage = async (garageInfo) => {
  try {
    let query = `INSERT INTO garage_master (garage_name, contact_number, email, thumbnail, open_time, close_time, description) values (?)`;
    let result = await conn.query(query, [garageInfo]);
    return result[0].insertId;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// insert reference to garage into owner garages
export const insertGarageOwner = async (ownerInfo) => {
  try {
    let query = `INSERT INTO owner_has_garages (owner_id, garage_id) values (?)`;
    let result = await conn.query(query, [ownerInfo]);
    return result[0].affectedRows;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// insert garage address
export const insertGarageAddress = async (addressInfo) => {
  try {
    let query = `INSERT INTO address_master (city_id, area, pincode) values (?)`;
    let result = await conn.query(query, [addressInfo]);
    return result[0].insertId;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// add garage address reference to garage addresses
export const insertGarageReference = async (references) => {
  try {
    let query = `INSERT INTO garage_address (address_id, garage_id,latitude,longitude) values (?)`;
    let result = await conn.query(query, [references]);
    return result[0].affectedRows;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// update garage
export const updateGarage = async (garageInfo) => {
  try {
    let query = `UPDATE garage_master SET garage_name= ?, contact_number= ?, email= ?, thumbnail= ?, open_time= ?, close_time= ?,description= ?  WHERE id = ?`;
    if (garageInfo[3] == "") {
      query = `UPDATE garage_master SET garage_name= ?, contact_number= ?, email= ?, open_time= ?, close_time= ?,description= ?  WHERE id = ?`;
      let first = garageInfo.slice(0, 3);
      let second = garageInfo.slice(4);
      garageInfo = first.concat(second);
    }
    let result = await conn.query(query, garageInfo);
    return result[0].affectedRows;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// update garage address
export const updateGarageAddress = async (addressInfo) => {
  try {
    let query = `UPDATE address_master SET city_id = ?, area = ?, pincode = ? WHERE id = (select address_id from garage_address where garage_id=?)`;
    let result = await conn.query(query, addressInfo);
    return result[0].affectedRows;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// delete garage
export const deleteGarage = async (garageId, addressId, referenceID) => {
  try {
    let query = `UPDATE garage_master SET is_delete = 1 WHERE id = ?`;
    let result = await conn.query(query, [garageId]);
    query = `UPDATE garage_addresses SET is_delete = 1 WHERE id= ?`;
    result = await conn.query(query2, [referenceID]);
    query = `UPDATE address_master SET is_delete=1 WHERE id= ?`;
    result = await conn.query(query3, [addressId]);
    return result[0].affectedRows;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// display garage details
export const displayGarage = async (garageId) => {
  try {
    let query = `SELECT * FROM garage_master gm JOIN garage_address ga ON gm.id = ga.garage_id JOIN address_master am ON ga.address_id = am.id WHERE gm.id = ? `;
    let result = await conn.query(query, [garageId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// display all services from service master
export const getServices = async () => {
  try {
    let query = "SELECT * FROM service_master;";
    let result = await conn.query(query);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get all garage details
export const getGarageList = async (ownerId) => {
  try {
    let query = `SELECT a.id as id, a.email, garage_name, contact_number, open_time, close_time, status,description,thumbnail from garage_master as a join owner_has_garages as b where b.owner_id = ?`;
    let result = await conn.query(query, [ownerId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get services which are not available in a garage
export const getNotAvailableService = async (id) => {
  try {
    let query =
      "SELECT * FROM service_master where id not in (select services_id from garage_has_services where garage_id=? and is_deleted !=1)";
    let result = await conn.query(query, id);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};
export const getNearByGarage = async (
  distance = 50,
  latitude = 0,
  longitude = 0
) => {
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  try {
    let query = `select gm.id, gm.garage_name, gm.thumbnail,a.area, c.city_name, s.state_name, ga.latitude as latitude, ga.longitude as longitude, ( ACOS((SIN(RADIANS(${latitude})) * SIN(RADIANS(ga.latitude))) + (COS(RADIANS(${latitude})) * COS(RADIANS(ga.latitude))) * (COS(RADIANS(ga.longitude) - RADIANS(${longitude})))) * 6371 ) as distance from garage_master as gm inner join garage_address as ga inner join address_master as a inner join city_master as c inner join state_master as s on gm.id = ga.garage_id and ga.address_id = a.id
    and a.city_id = c.id and c.sid = s.id WHERE gm.is_deleted = 0
    having distance <= ${distance};`;
    let result = await conn.query(query);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get services of a single garage
export const getSingleGarageService = async (garageId) => {
  try {
    let query = `select gm.id, gm.garage_name, gm.thumbnail,a.area, c.city_name, s.state_name
    from garage_master as gm inner join garage_address as ga inner join address_master as a 
    inner join city_master as c inner join state_master as s
    on gm.id = ga.garage_id and ga.address_id = a.id
    and a.city_id = c.id and c.sid = s.id where gm.id = ?;`;
    let result = await conn.query(query, [garageId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get opening and closing times of a garage
export const getGarageDuration = async (id) => {
  try {
    let query = "select open_time,close_time from garage_master where id = ?";
    let result = await conn.query(query, [id]);
    return result[0][0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// find service with service name
export const findService = async (serviceInfo) => {
  try {
    let query = `SELECT * FROM service_master WHERE name = ?`;
    let result = await conn.query(query, [serviceInfo]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// insert new services into service master
export const insertService = async (serviceInfo) => {
  try {
    let query = `INSERT INTO service_master (name, description) VALUES (?)`;
    let result = await conn.query(query, [serviceInfo]);
    return result[0].insertId;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// delete service from service master
export const deleteFromService = async (serviceId) => {
  try {
    let query = "DELETE FROM service_master where id = ?;";
    let result = await conn.query(query, [serviceId]);
    return result[0].insertId;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// insert reference service reference to garage services
export const insertGarageService = async (serviceInfo) => {
  try {
    let query = `INSERT INTO garage_has_services (garage_id, services_id, price) VALUES (?)`;
    let result = await conn.query(query, [serviceInfo]);
    return result[0].insertId;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// find services offered by garage
export const findGarageService = async (serviceInfo) => {
  try {
    let query = `SELECT * FROM garage_has_services WHERE garage_id = ? AND services_id = ?`;
    let result = await conn.query(query, serviceInfo);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get all services of garages of owner
export const getOwnerService = async (ownerId, garageId) => {
  try {
    let query = `SELECT b.id,c.name, c.description, b.price FROM owner_has_garages AS a JOIN garage_has_services AS b JOIN service_master AS c on a.garage_id = b.garage_id and b.services_id = c.id WHERE b.is_deleted=0 AND  a.owner_id = ? AND b.garage_id = ?;`;
    let result = await conn.query(query, [ownerId, garageId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get all garages of owner
export const getOwnerGarages = async (ownerId) => {
  try {
    let query = `SELECT a.garage_id, b.garage_name, b.thumbnail, b.status, b.email, b.contact_number, b.open_time, b.close_time, b.description
    FROM owner_has_garages AS a JOIN garage_master AS b on a.garage_id = b.id WHERE   a.owner_id = ? and b.is_deleted = 0;`;
    let result = await conn.query(query, [ownerId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// update service of a garage
export const updateGarageService = async (serviceInfo) => {
  try {
    let query = `UPDATE garage_has_services SET is_deleted = 0 WHERE garage_id = ? AND services_id = ?`;
    let result = await conn.query(query, serviceInfo);
    return result[0].affectedRows;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// delete service from garage
export const deleteGarageService = async (serviceInfo) => {
  try {
    let query = `UPDATE garage_has_services SET is_deleted = 1 where id = ?`;
    let result = await conn.query(query, serviceInfo);
    return result[0].affectedRows;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// dynamic select from any table with table name
export const selectByTableName = async (tableName) => {
  try {
    let query = "SELECT * FROM " + tableName + ";";
    let [results] = await conn.query(query);
    return results;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// dynamic select from any table with table name and id
export const selectById = async (tableName, id) => {
  try {
    let query = "SELECT * FROM " + tableName + " WHERE id = ?;";
    let [results] = await conn.query(query, [id]);
    return results;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// dynamic select from any table with table name and a field with it's value
export const selectByFieldName = async (tableName, fieldName, value) => {
  try {
    let query = "SELECT * FROM " + tableName + " WHERE " + fieldName + " = ?;";
    let [results] = await conn.query(query, [value]);
    return results;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

//garage wise service listing
export const serviceListing = async (garageId) => {
  try {
    let query = `select g.id,s.name,s.description,g.price from service_master as s,garage_has_services as g where s.id=g.services_id and g.garage_id=? and g.is_deleted = 0;`;
    let [results] = await conn.query(query, [garageId]);
    return results;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get customer details of a garage
export const getCustomerNames = async (garageId) => {
  try {
    let query =
      "SELECT users.name, users.email, appointments.status, slot_master.garage_id FROM appointments LEFT JOIN users ON appointments.customer_id = users.id LEFT JOIN slot_master ON appointments.slot_id = slot_master.id WHERE slot_master.garage_id = ?";
    const result = await conn.query(query, [garageId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// dynamic select to select specific fields of a table
export const selectByFieldNames = async (tableName, fields) => {
  try {
    let query = "SELECT * FROM " + tableName + " WHERE ";
    let i = 0;
    let keys = Object.keys(fields);
    keys.forEach((element) => {
      if (i != keys.length - 1) {
        query += `${element} = "${fields[element]}" AND `;
      } else {
        query += `${element} = "${fields[element]}";`;
      }
      i++;
    });
    let [results] = await conn.query(query);
    return results;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// dynamically count number of entries with table name, field name and it's value
export const countByFieldName = async (tableName, fieldName, value) => {
  try {
    let query =
      "SELECT COUNT(*) as count FROM " +
      tableName +
      " WHERE " +
      fieldName +
      " = ?;";
    let [results] = await conn.query(query, [value]);
    return results[0].count;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// count garages owned by an owner
export const countgarages = async (ownerId) => {
  try {
    let query =
      " select COUNT(*) as count from owner_has_garages join garage_master on owner_has_garages.garage_id = garage_master.id where owner_has_garages.owner_id = ? and garage_master.is_deleted = '0';";

    let [results] = await conn.query(query, [ownerId]);
    return results[0].count;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// insert data with table name, fields and it's values
export const insertData = async (tableName, fields, values) => {
  try {
    let query = `INSERT INTO ` + tableName + `(`;
    let i = 0;
    fields.forEach((element) => {
      if (i != fields.length - 1) {
        query += `${element.replaceAll('"', "")}, `;
      } else {
        query += `${element.replaceAll('"', "")}) `;
      }
      i++;
    });
    query += `VALUES (?)`;
    let [result] = await conn.query(query, [values]);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// count services provided by all garages owned by owner
export const countServices = async (ownerId) => {
  try {
    let query =
      "SELECT COUNT(*) AS count FROM owner_has_garages AS a JOIN garage_has_services AS b ON a.garage_id = b.garage_id WHERE a.owner_id = ? and is_deleted=0;";
    let [results] = await conn.query(query, [ownerId]);
    return results[0].count;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// count appointments done by all garages owned by owner
export const countAppointments = async (ownerId) => {
  try {
    let query =
      "SELECT COUNT(*) AS count FROM owner_has_garages AS a JOIN slot_master as b JOIN appointments AS c ON a.garage_id = b.garage_id AND b.id = c.slot_id WHERE a.owner_id = ? and c.status = ?;";
    let [result] = await conn.query(query, [ownerId, 1]);
    let [result2] = await conn.query(query, [ownerId, 4]);
    let [result3] = await conn.query(query, [ownerId, 3]);
    let pending = result[0].count;
    let successful = result2[0].count;
    let cancelled = result3[0].count;
    return { pending, successful, cancelled };
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get types of vehicles
export const getVehicleType = async () => {
  try {
    let query = "select * from vehicle_types";
    let [result] = await conn.query(query);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get data of vehicles of customer
export const findVehicleData = async (email, type) => {
  try {
    let query = `SELECT user_has_vehicles.id,users.email,vehicle_types.name, vehicle_master.brand, 
    vehicle_master.model,vehicle_master.year, user_has_vehicles.register_plate_number,vehicle_condition.condition_image
    from vehicle_condition inner join vehicle_types inner join vehicle_master inner join user_has_vehicles inner join users
    on vehicle_condition.vehicle_id=user_has_vehicles.id and vehicle_types.id = vehicle_master.type_id and vehicle_master.id = user_has_vehicles.vehicle_id
    and users.id = user_has_vehicles.owner_id and users.email = ? and vehicle_types.id = ?;`;
    let [result] = await conn.query(query, [email, type]);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get addresses of user
export const getUserAddress = async (userId) => {
  try {
    let query =
      "SELECT b.area AS area, b.pincode AS pincode, c.id AS cityId, c.city_name AS cityName, c.sid AS stateId, d.state_name as stateName from user_address as a join address_master as b join city_master as c join state_master as d on a.address_id = b.id and b.city_id = c.id and c.sid = d.id where a.user_id = ?;";
    const result = await conn.query(query, [userId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get appointments of owner
export const getAppointments = async (ownerDetails) => {
  try {
    let query = `select c.id as id, d.name as customerName,  b.start_time as startTime, b.end_time as endTime,c.status, c.vehicle_status as vehicle_status from owner_has_garages as a join slot_master as b join appointments as c join users as d on a.garage_id = b.garage_id and b.id = c.slot_id and c.customer_id = d.id where a.garage_id = ? and owner_id = ? and c.status != 4 LIMIT ?, 10;
      select COUNT(c.id) as count from owner_has_garages as a join slot_master as b join appointments as c join users as d on a.garage_id = b.garage_id and b.id = c.slot_id and c.customer_id = d.id where a.garage_id = ? and owner_id = ? and c.status != 4;`;
    let result = await conn.query(query, ownerDetails);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

//Get Owner side Notifications
export const getNotifications = async (userId) => {
  try {
    let query =
      "select c.id as id, d.name as customerName,  b.start_time as startTime, b.end_time as endTime from owner_has_garages as a join slot_master as b join appointments as c join users as d on a.garage_id = b.garage_id and b.id = c.slot_id and c.customer_id = d.id where owner_id = ? and c.status = 1;";

    let result = await conn.query(query, userId);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// Get Customer side Notifications
export const userNotification = async (userId) => {
  try {
    let query =
      "select c.id as id, d.name as customerName,  b.start_time as startTime, b.end_time as endTime from owner_has_garages as a join slot_master as b join appointments as c join users as d on a.garage_id = b.garage_id and b.id = c.slot_id and c.customer_id = d.id where d.id = ? and c.status = 2 or c.vehicle_status = 3;";

    let result = await conn.query(query, userId);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// find  owner of a garage
export const findOwner = async (garageId) => {
  try {
    let query =
      "select og.owner_id as 'owner_id' from garage_master as gm join owner_has_garages as og on gm.id = og.garage_id where garage_id = ?;";

    let result = await conn.query(query, garageId);
    return result[0];
  } catch (error) {
    logger.error(error);
  }
};

// get all booked appointments of all garages of owner
export const getBookedAppointments = async (ownerDetails) => {
  try {
    let query =
      "select d.id, b.garage_name as garageName, e.name as customerName,  c.start_time as startTime, c.end_time as endTime from owner_has_garages as a join garage_master as b join slot_master as c join appointments as d join users as e on a.garage_id = b.id and a.garage_id = c.garage_id and c.id = d.slot_id and d.customer_id = e.id where d.status = 2 and owner_id = ? and c.start_time >= NOW() order by c.start_time;";
    let result = await conn.query(query, ownerDetails);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// fetching garage wise slots at customer side
export const customerSlotListing = async (garageId, date, date2) => {
  try {
    let query = `select * from slot_master where garage_id= ? and start_time > '${date}' and end_time <= '${date2}' and availability_status = 1 and is_deleted=0 and start_time > now()`;
    const [result] = await conn.query(query, [garageId]);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// slot listing with date range
export const garageSlotListing = async (garageId, startDate, endDate) => {
  try {
    let query =
      "SELECT start_time as startTime, end_time as endTime from slot_master where garage_id = ? and is_deleted = 0;";
    const result = await conn.query(query, [garageId, startDate, endDate]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get services associated with a specific vehicle
export const getVehicleAssociatedServices = async (userId) => {
  try {
    let query = `SELECT appointment_services.id, vehicle_types.name as vehicle_type,vehicle_master.model as vehicle_model,user_has_vehicles.register_plate_number as vehicle_regd_number,
    slot_master.created_at as date  ,service_master.name as service_name, appointments.status as status
    FROM appointments 
    LEFT JOIN appointment_services 
    ON appointments.id = appointment_services.appointment_id
    LEFT JOIN service_master 
    ON appointment_services.service_id = service_master.id
    LEFT JOIN slot_master 
    ON appointments.slot_id = slot_master.id
    LEFT JOIN user_has_vehicles 
    ON appointments.customer_id = user_has_vehicles.owner_id
    LEFT JOIN vehicle_master
    ON user_has_vehicles.vehicle_id = vehicle_master.id
    LEFT JOIN vehicle_types
    ON vehicle_master.type_id = vehicle_types.id where user_has_vehicles.owner_id = ?;`;
    const result = await conn.query(query, [userId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get address of a garage
export const getGarageAddress = async (garageId) => {
  try {
    const query =
      "SELECT a.latitude as latitude, a.longitude as longitude, b.area as area, b.pincode as pincode, c.id as cityId, c.sid as stateId FROM garage_address as a join address_master as b join city_master as c on a.address_id = b.id and b.city_id = c.id WHERE a.garage_id = ?;";
    const result = await conn.query(query, [garageId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// insert user feedback
export const insertFeedback = async (
  customerId,
  garageId,
  description,
  rating
) => {
  try {
    var query = `INSERT INTO feedbacks (garage_id, customer_id, feedback, ratings) VALUES (?,?,?,?)`;
    const result = await conn.query(query, [
      garageId,
      customerId,
      description,
      rating,
    ]);
    return result[0].insertId;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get invoice details
export const getInvoiceDetails = async (appointmentDetails) => {
  try {
    let query = `SELECT garage_name, slot_master.start_time, appointments.id AS appointment_id, 
    users.name AS customer_name, address_master.area, address_master.pincode, city_name, 
    service_master.description AS service_description, appointment_payments.status AS payment_status, 
    garage_has_services.price 
    FROM appointments 
    JOIN slot_master ON appointments.slot_id = slot_master.id 
    JOIN garage_master ON slot_master.garage_id = garage_master.id 
    JOIN users ON appointments.customer_id = users.id 
    JOIN user_address ON users.id = user_address.user_id 
    JOIN address_master ON user_address.address_id = address_master.id 
    JOIN city_master ON address_master.city_id = city_master.id 
    JOIN appointment_services ON appointments.id = appointment_services.appointment_id 
    JOIN appointment_payments ON appointment_payments.appointment_id = appointments.id 
    JOIN garage_has_services ON garage_has_services.id = appointment_services.service_id 
    JOIN service_master ON garage_has_services.services_id = service_master.id 
    WHERE appointments.id = ? AND users.id = ?;`;
    let [result] = await conn.query(query, appointmentDetails);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// check if feedback already exists or not
export const ifFeedbackExist = async (customerId) => {
  try {
    var query = `SELECT * FROM feedbacks where customer_id = ?`;
    const result = await conn.query(query, [customerId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get appointments by date range
export const getAppointsByDateRange = async (payload) => {
  try {
    const query =
      "select c.name as customerName, b.start_time as startTime, b.end_time as endTime from appointments as a join slot_master as b join users as c on a.slot_id = b.id and a.customer_id = c.id where b.start_time > ? and b.end_time <= ? and b.garage_id = ? and a.status = 2;";
    const result = await conn.query(query, payload);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get all appointments for customer
export const getCustomerAppointments = async (customerId) => {
  try {
    let query = `SELECT garage_name, slot_master.start_time, appointments.id AS appointment_id, appointment_payments.status AS payment_status, invoice_url, appointments.status, appointments.vehicle_status, users.email AS customer_email FROM appointments JOIN slot_master ON appointments.slot_id = slot_master.id JOIN garage_master ON slot_master.garage_id = garage_master.id JOIN appointment_payments ON appointment_payments.appointment_id = appointments.id JOIN users ON users.id = appointments.customer_id WHERE appointments.customer_id=?;`;
    let [result] = await conn.query(query, [customerId]);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// dynamic update with table name, fields and conditions
export const updateFields = async (tableName, fields, conditions) => {
  try {
    let query = `UPDATE ` + tableName + ` SET ? WHERE `;
    let keys = Object.keys(conditions);
    if (keys.length == 1) {
      query += `${keys[0]} = ${conditions[keys[0]]};`;
    } else {
      let i = 0;
      keys.forEach((element) => {
        if (i != keys.length - 1) {
          query += `${element} = "${conditions[element]}" AND `;
        } else {
          query += `${element} = "${conditions[element]}";`;
        }
        i++;
      });
    }
    let [result] = await conn.query(query, fields);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get appointments of a specific garage
export const getGarageAppointments = async (garageId, limit) => {
  try {
    let query = `
    SELECT users.name AS customer_name, users.email AS customer_email, slot_master.start_time, appointments.id AS appointment_id, appointment_payments.status AS payment_status, invoice_url, appointments.status AS appointment_status FROM appointments JOIN slot_master ON appointments.slot_id = slot_master.id JOIN appointment_payments ON appointment_payments.appointment_id = appointments.id JOIN users ON users.id = appointments.customer_id WHERE slot_master.garage_id=? AND appointments.status = 2 LIMIT ?, 10;
    SELECT COUNT(users.name) AS count FROM appointments JOIN slot_master ON appointments.slot_id = slot_master.id JOIN appointment_payments ON appointment_payments.appointment_id = appointments.id JOIN users ON users.id = appointments.customer_id WHERE slot_master.garage_id=? AND appointments.status = 2;`;
    let [result] = await conn.query(query, [garageId, limit, garageId]);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// slot booking
export const bookSlotService = async (userId, slotId) => {
  try {
    let query = `INSERT INTO appointments (slot_id,customer_id) VALUES (?,?);`;
    let result = await conn.query(query, [slotId, userId]);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// count revenue of the owner
export const countRevenue = async (userId) => {
  try {
    let query = `SELECT SUM(ap.sub_total) AS revenue FROM appointment_payments ap JOIN payment_master pm  ON ap.appointment_id= pm.appointment_id JOIN appointments at on at.id = pm.appointment_id JOIN slot_master sm on sm.id = at.slot_id join garage_master gm on gm.id = sm.garage_id JOIN owner_has_garages og on og.garage_id = gm.id  WHERE og.owner_id = ?;`;
    let result = await conn.query(query, [userId]);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// update appointment status
export const handleUpdateAppointments = async (status, appointmentId) => {
  try {
    let query = `UPDATE appointments SET status = ? WHERE id = ?;`;
    let result = await conn.query(query, [status, appointmentId]);
    return result[0];
  } catch (error) {
    return { error };
  }
};

// count number of garages registered on the platform
export const garagesCount = async () => {
  try {
    let query = "SELECT count(*) as count FROM garage_master;";
    let result = await conn.query(query);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// count number of customer registered on the platform
export const customersCount = async () => {
  try {
    let query = "SELECT count(*) as count FROM users where role_id = 0;";
    let result = await conn.query(query);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// count services provided on the platform
export const servicesCount = async () => {
  try {
    let query = "SELECT count(*) as count FROM service_master;";
    let result = await conn.query(query);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

export const findVehicleStatus = async (garageId, limit) => {
  try {
    let query = `SELECT appointments.id, vehicle_status, register_plate_number, users.name AS customer_name, brand, model, year FROM appointments JOIN user_has_vehicles ON appointments.vehicle_id = user_has_vehicles.id JOIN vehicle_master ON user_has_vehicles.vehicle_id = vehicle_master.id JOIN users ON user_has_vehicles.owner_id = users.id JOIN slot_master ON appointments.slot_id = slot_master.id WHERE garage_id = ? AND appointments.status = 2 LIMIT ?, 10;
    SELECT COUNT(appointments.id) AS count FROM appointments JOIN user_has_vehicles ON appointments.vehicle_id = user_has_vehicles.id JOIN vehicle_master ON user_has_vehicles.vehicle_id = vehicle_master.id JOIN users ON user_has_vehicles.owner_id = users.id JOIN slot_master ON appointments.slot_id = slot_master.id WHERE garage_id = ? AND appointments.status = 2`;
    let [result] = await conn.query(query, [garageId, limit, garageId]);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get all vehicles of the user
export const findAllUserVehicles = async (email) => {
  try {
    let query = `SELECT user_has_vehicles.id,users.email,vehicle_types.name, vehicle_master.brand, 
    vehicle_master.model,vehicle_master.year, user_has_vehicles.register_plate_number,vehicle_condition.condition_image
    from vehicle_condition inner join vehicle_types inner join vehicle_master inner join user_has_vehicles inner join users
    on vehicle_condition.vehicle_id=user_has_vehicles.id and vehicle_types.id = vehicle_master.type_id and vehicle_master.id = user_has_vehicles.vehicle_id
    and users.id = user_has_vehicles.owner_id and users.email = ?;`;
    let [result] = await conn.query(query, [email]);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// get user vehicle
export const fetchUserVehicle = async (id) => {
  try {
    let query = `SELECT uv.id,vm.brand,vm.model,vm.year,vc.description,vc.condition_image,uv.register_plate_number FROM vehicle_master vm JOIN user_has_vehicles uv ON vm.id = uv.vehicle_id JOIN vehicle_condition vc ON vc.vehicle_id = uv.id WHERE uv.id = ?`;
    let [result] = await conn.query(query, [id]);
    return result;
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

// update user vehicle
export const updateVehicleDetails = async (vehicleInfo) => {
  try {
    let query = `UPDATE user_has_vehicles uv ,vehicle_master vm ,vehicle_condition vc SET uv.register_plate_number = ?,vm.brand = ?,vm.model = ?,vm.year = ?,vc.description = ?,vc.condition_image= ?  where uv.id = ? AND vm.id=uv.vehicle_id and vc.vehicle_id = uv.id`;
    let result = await conn.query(query, vehicleInfo);
    return result[0];
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

export const getPaymentStatusService = async (id) => {
  try {
    let query = `select u.name, s.start_time, s.end_time
    from appointment_payments as ap join appointments as a on ap.appointment_id = a.id join 
    slot_master as s on a.slot_id = s.id join users as u on
    a.customer_id = u.id where appointment_id = ? order by s.end_time desc limit 1;`;
    let result = await conn.query(query, id);
    return result[0];
  } catch (error) {
    return { error };
  }
};
