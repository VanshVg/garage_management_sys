import conn from "../config/dbConfig.js";

export const findOne = async (email) => {
  try {
    let query = "SELECT * FROM users WHERE email = ?";
    let [result] = await conn.query(query, [email]);
    return result;
  } catch (error) {
    return { error };
  }
};

export const findOneById = async (userId) => {
  try {
    let query = "SELECT * FROM users WHERE id = ?";
    let [results] = await conn.query(query, [userId]);
    let User = results;
    return User;
  } catch (err) {
    return { err };
  }
};

export const activateUser = async (userId) => {
  try {
    let query = "UPDATE users SET is_verified = 1 where id = ?";
    let [results] = await conn.query(query, [userId]);
    let User = results[0];
    return User;
  } catch (err) {
    return { err };
  }
};

export const updatePassword = async (userId, password) => {
  try {
    let query = "UPDATE users SET password = ? where id = ?";
    let [results] = await conn.query(query, [password, userId]);
    let User = results[0];
    return User;
  } catch (err) {
    return { err };
  }
};

export const insert = async (UserInfo) => {
  try {
    let query = `INSERT INTO users ( role_id, name, email, password, activate_link) values (?)`;
    let results = await conn.query(query, [UserInfo]);
    return results[0].insertId;
  } catch (error) {
    return { error };
  }
};

export const insertSlot = async (slotTime) => {
  try {
    let query = `INSERT INTO slot_master (garage_id,start_time,end_time) values (?)`;
    let results = await conn.query(query, [slotTime]);
    return results[0].insertId;
  } catch (error) {
    return { error };
  }
};

export const updateSlot = async (slotTime) => {
  try {
    let query = `UPDATE slot_master set start_time = ?,end_time = ? where id =?`;
    let results = await conn.query(query, [slotTime[0], slotTime[1], slotTime[2]]);
    return results[0];
  } catch (error) {
    return { error };
  }
};

export const deleteSlot = async (slotId) => {
  try {
    let query = `UPDATE slot_master set is_deleted = 1 where id = ?`;
    let results = await conn.query(query, [slotId]);
    return results[0];
  } catch (error) {
    return { error };
  }
};

export const getAllSlots = async (offset) => {
  try {
    let query = `SELECT slot_master.id, garage_master.garage_name as garageName, start_time, end_time, availability_status 
                 FROM slot_master 
                 LEFT JOIN  garage_master ON slot_master.garage_id = garage_master.id limit ?, 10;
                 SELECT COUNT(id) as count FROM slot_master;`;
    let result = await conn.query(query, offset);
    return result[0];
  } catch (error) {
    return { error };
  }
};
export const updateUserByEmail = async (userInfo) => {
  try {
    let query = `UPDATE users SET name = ?, bio = ? WHERE email = ?`;
    let results = await conn.query(query, userInfo);
    return results[0].affectedRows;
  } catch (error) {
    return { error };
  }
};

export const getState = async () => {
  try {
    let query = `SELECT * FROM state_master`;
    let [results] = await conn.query(query);
    let state = results;
    return state;
  } catch (error) {
    return { error };
  }
};
export const getCity = async (stateId) => {
  try {
    let query = `SELECT * FROM city_master where sid=?`;
    let [results] = await conn.query(query, [stateId]);
    let city = results;
    return city;
  } catch (error) {
    return { error };
  }
};
export const findAddressById = async (userId) => {
  try {
    let query = `SELECT * FROM user_address WHERE user_id = ?`;
    let [results] = await conn.query(query, [userId]);
    let address = results[0];
    return address;
  } catch (error) {
    return { error };
  }
};

export const insertAddress = async (userInfo) => {
  try {
    let query = `INSERT INTO address_master (city_id, area, pincode) VALUES (?)`;
    let results = await conn.query(query, [userInfo]);
    return results[0].insertId;
  } catch (error) {
    return { error };
  }
};

export const insertUserAddress = async (userInfo) => {
  try {
    let query = `INSERT INTO user_address (user_id, address_id) VALUES (?)`;
    let results = await conn.query(query, [userInfo]);
    return results[0].insertId;
  } catch (error) {
    return { error };
  }
};

export const updateAddressById = async (userInfo) => {
  try {
    let query = `UPDATE address_master SET city_id = ?, area = ?, pincode = ? WHERE id = ?`;
    let results = await conn.query(query, userInfo);
    return results[0].affectedRows;
  } catch (error) {
    return { error };
  }
};

export const deleteUserAddress = async (userInfo) => {
  try {
    let query = `DELETE FROM address_master WHERE user_id = ?`;
    let results = await conn.query(query, userInfo);
    return results[0].affectedRows;
  } catch (error) {
    return { error };
  }
};

// garage insert
export const insertGarage = async (garageInfo) => {
  try {
    let query = `INSERT INTO garage_master (garage_name, contact_number, email, thumbnail, open_time, close_time, description) values (?)`;
    let result = await conn.query(query, [garageInfo]);
    return result[0].insertId;
  } catch (error) {
    return { error };
  }
};
// owner has garage insert
export const insertGarageOwner = async (ownerInfo) => {
  try {
    let query = `INSERT INTO owner_has_garages (owner_id, garage_id) values (?)`;
    let result = await conn.query(query, [ownerInfo]);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
};
// garage address insert
export const insertGarageAddress = async (addressInfo) => {
  try {
    let query = `INSERT INTO address_master (city_id, area, pincode) values (?)`;
    let result = await conn.query(query, [addressInfo]);
    return result[0].insertId;
  } catch (error) {
    return { error };
  }
};
// garage addres reference
export const insertGarageReference = async (references) => {
  try {
    let query = `INSERT INTO garage_address (address_id, garage_id,latitude,longitude) values (?)`;
    let result = await conn.query(query, [references]);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
};
// garage update
export const updateGarage = async (garageInfo) => {
  try {
    let query = `UPDATE garage_master SET garage_name= ?, contact_number= ?, email= ?, thumbnail= ?, open_time= ?, close_time= ?,description= ?  WHERE id = ?`;
    let result = await conn.query(query, garageInfo);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
};
// update garage address
export const updateGarageAddress = async (addressInfo) => {
  try {
    let query = `UPDATE address_master SET city_id = ?, area = ?, pincode = ? WHERE id = ?`;
    let result = await conn.query(query, addressInfo);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
};
// garage delete
export const deleteGarage = async (garageId, addressId, referenceID) => {
  try {
    let query = `UPDATE garage_master SET is_delete = 1 WHERE id = ?`;
    let query2 = `UPDATE garage_addresses SET is_delete = 1 WHERE id= ?`;
    let query3 = `UPDATE address_master SET is_delete=1 WHERE id= ?`;
    let result = await conn.query(query, [garageId]);
    let result2 = await conn.query(query2, [referenceID]);
    let result3 = await conn.query(query3, [addressId]);
    return result[0].affectedRows;
  } catch (error) {
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
    return { error };
  }
};

export const getServices = async () => {
  try {
    let query = "SELECT * FROM service_master;";
    let result = await conn.query(query);
    return result[0];
  } catch (err) {
    return { err };
  }
};
// get all garage details
export const getGarageList = async (ownerId) => {
  try {
    let query = `SELECT a.id, a.email, garage_name, contact_number, open_time, close_time, status,description,thumbnail from garage_master as a join owner_has_garages as b where b.owner_id = ?`;
    let result = await conn.query(query, [ownerId]);
    return result[0];
  } catch (error) {
    return { error };
  }
};

export const getGaragesService = async () => {
  try{
    let query = `SELECT garage_name, contact_number,thumbnail from garage_master;`
    let result = await conn.query(query);
    return result[0];
  }catch(err){
    return {err};
  }
}

export const findService = async (serviceInfo) => {
  try {
    let query = `SELECT * FROM service_master WHERE name = ?`;
    let result = await conn.query(query, [serviceInfo]);
    return result[0];
  } catch (error) {
    return { error };
  }
};

export const insertService = async (serviceInfo) => {
  try {
    let query = `INSERT INTO service_master (name, description) VALUES (?)`;
    let result = await conn.query(query, [serviceInfo]);
    return result[0].insertId;
  } catch (error) {
    return { error };
  }
};

export const deleteFromService = async (serviceId) => {
  try {
    let query = "DELETE FROM service_master where id = ?;";
    let result = await conn.query(query, [serviceId]);
    return result[0].insertId;
  } catch (error) {
    return { error };
  }
};

export const insertGarageService = async (serviceInfo) => {
  try {
    let query = `INSERT INTO garage_has_services (garage_id, services_id, price) VALUES (?)`;
    let result = await conn.query(query, [serviceInfo]);
    return result[0].insertId;
  } catch (error) {
    return { error };
  }
};

export const findGarageService = async (serviceInfo) => {
  try {
    let query = `SELECT * FROM garage_has_services WHERE garage_id = ? AND services_id = ?`;
    let result = await conn.query(query, serviceInfo);
    return result[0];
  } catch (error) {
    return { error };
  }
};

export const getOwnerService = async (ownerId) => {
  try {
    let query = `SELECT c.name, c.description, b.price FROM owner_has_garages AS a JOIN garage_has_services AS b JOIN service_master AS c on a.garage_id = b.garage_id and b.services_id = c.id WHERE a.owner_id = ?;`;
    let result = await conn.query(query, [ownerId]);
    return result[0];
  } catch (error) {
    return { error };
  }
};

export const getOwnerGarages = async (ownerId) => {
  try {
    let query = `SELECT c.name, c.description, b.price FROM owner_has_garages AS a JOIN garage_has_services AS b JOIN service_master AS c on a.garage_id = b.garage_id and b.services_id = c.id WHERE a.owner_id = ?;`;
    let result = await conn.query(query, [ownerId]);
    return result[0];
  } catch (error) {
    return { error };
  }
};

export const updateGarageService = async (serviceInfo) => {
  try {
    let query = `UPDATE garage_has_services SET is_deleted = 0 WHERE garage_id = ? AND services_id = ?`;
    let result = await conn.query(query, serviceInfo);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
};

export const deleteGarageService = async (serviceInfo) => {
  try {
    let query = `UPDATE garage_has_services SET is_deleted = 1 WHERE garage_id = ? AND services_id = ?`;
    let result = await conn.query(query, serviceInfo);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
};

export const selectByTableName = async (tableName) => {
  try {
    let query = "SELECT * FROM " + tableName + ";";
    let [results] = await conn.query(query);
    return results;
  } catch (err) {
    return { err };
  }
};

export const selectById = async (tableName, id) => {
  try {
    let query = "SELECT * FROM " + tableName + " WHERE id = ?;";
    let [results] = await conn.query(query, [id]);
    return results;
  } catch (err) {
    return { err };
  }
};

export const selectByFieldName = async (tableName, fieldName, value) => {
  try {
    let query = "SELECT * FROM " + tableName + " WHERE " + fieldName + " = ?;";
    let [results] = await conn.query(query, [value]);
    return results;
  } catch (err) {
    return { err };
  }
};
//garage wise service listing
export const serviceListing = async (garageId) => {
  try {
    let query = `SELECT sm.id,sm.description FROM service_master sm JOIN garage_has_services gs ON sm.id = gs.services_id where gs.garage_id = ?`;
    let [results] = await conn.query(query, [garageId]);
    return results;
  } catch (error) {
    return { error };
  }
};

export const getCustomerNames = async (garageId) => {
  try {
    let query =
      "SELECT users.name, users.email, appointments.status, slot_master.garage_id FROM appointments LEFT JOIN users ON appointments.customer_id = users.id LEFT JOIN slot_master ON appointments.slot_id = slot_master.id WHERE slot_master.garage_id = ?";
    const result = await conn.query(query, [garageId]);
    return result[0];
  } catch (error) {
    return { error };
  }
};
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
  } catch (err) {
    return { err };
  }
};
export const countByFieldName = async (tableName, fieldName, value) => {
  try {
    let query = "SELECT COUNT(*) as count FROM " + tableName + " WHERE " + fieldName + " = ?;";
    let [results] = await conn.query(query, [value]);
    return results[0].count;
  } catch (err) {
    return { err };
  }
};

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
  } catch (err) {
    return { err };
  }
};
export const countServices = async (ownerId) => {
  try {
    let query =
      "SELECT COUNT(*) AS count FROM owner_has_garages AS a JOIN garage_has_services AS b ON a.garage_id = b.garage_id WHERE a.owner_id = ?;";
    let [results] = await conn.query(query, [ownerId]);
    return results[0].count;
  } catch (err) {
    return { err };
  }
};
export const countAppointments = async (ownerId) => {
  try {
    let query =
      "SELECT COUNT(*) AS count FROM owner_has_garages AS a JOIN slot_master as b JOIN appointments AS c ON a.garage_id = b.garage_id AND b.id = c.slot_id WHERE a.owner_id = ?;";
    let [results] = await conn.query(query, [ownerId]);
    query = query.replace(";", " AND c.status = 1");
    let [results2] = await conn.query(query, [ownerId]);
    let totalCount = results[0].count;
    let successCount = results2[0].count;
    return { totalCount, successCount };
  } catch (err) {
    return { err };
  }
};

export const findVehicleData = async (ownerId) => {
  try {
    let query = `SELECT vehicle_master.brand, vehicle_master.model, vehicle_master.year, vehicle_condition.condition_image, user_has_vehicles.register_plate_number, user_has_vehicles.id from vehicle_master JOIN user_has_vehicles ON vehicle_master.id = user_has_vehicles.vehicle_id JOIN vehicle_condition ON vehicle_condition.vehicle_id = user_has_vehicles.id WHERE user_has_vehicles.owner_id = ?;`;
    let [result] = await conn.query(query, [ownerId]);
    return result;
  } catch (error) {
    return { err };
  }
};

export const getUserAddress = async (userId) => {
  try {
    let query =
      "SELECT b.area AS area, b.pincode AS pincode, c.id AS cityId, c.city_name AS cityName, c.sid AS stateId, d.state_name as stateName from user_address as a join address_master as b join city_master as c join state_master as d on a.address_id = b.id and b.city_id = c.id and c.sid = d.id where a.user_id = ?;";
    const result = await conn.query(query, [userId]);
    return result[0];
  } catch (error) {
    return { error };
  }
};

export const getAppointments = async (ownerDetails) => {
  try {
    let query = "select d.name as customerName,  b.start_time as startTime, b.end_time as endTime from owner_has_garages as a join slot_master as b join appointments as c join users as d on a.garage_id = b.garage_id and b.id = c.slot_id and c.customer_id = d.id where a.garage_id = ? and owner_id = ?;";
    let result = await conn.query(query, ownerDetails);
    return result[0];
  }
  catch (error) {
    return { error };
  }
}
// fetching garage wise slots at customer side
export const customerSlotListing = async (garageId, startDate, endDate) => {
  try {
    let query = `select DATE_FORMAT(start_time, "%h:%i %p") as startTime ,DATE_FORMAT(end_time, "%h:%i %p")as endTime , id from slot_master where garage_id= ? and  start_time >= ? and end_time < ? ;`
    const result = await conn.query(query, [garageId, startDate, endDate]);
    return result[0];
  } catch (error) {
    return { error };
  }
}

export const getVehicleAssociatedServices = async (userId) => {
  try {
    let query = `SELECT appointment_services.id, vehicle_types.name as vehicle_type,vehicle_master.model as vehicle_model,user_has_vehicles.register_plate_number as vehicle_regd_number,
    slot_master.create_at as date  ,service_master.name as service_name, appointments.status as status , service_master.price as amount
    FROM appointments 
    LEFT JOIN appointment_services 
    ON appointments.id = appointment_services.appointment_id
    LEFT JOIN service_master 
    ON appointment_services.service_id = service_master.id
    LEFT JOIN slot_master 
    ON appointments.slot_id = slot_master.id
    LEFT JOIN user_has_vehicles 
    ON appointments.vehicle_id = user_has_vehicles.vehicle_id
    LEFT JOIN vehicle_master
    ON user_has_vehicles.vehicle_id = vehicle_master.id
    LEFT JOIN vehicle_types
    ON vehicle_master.type_id = vehicle_types.id where user_has_vehicles.owner_id = ?;`
    const result = await conn.query(query, [userId])
    return result[0]
  } catch (error) {
    return { error }
  }
}
