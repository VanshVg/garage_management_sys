import conn from "../config/dbConfig.js";

export const findOne = async (email) => {
  try {
    let query = "SELECT * FROM users WHERE email = ?";
    let [results] = await (await conn()).query(query, [email]);
    let User = results;
    return User;
  } catch (err) {
    return { err };
  }
};

export const findOneById = async (userId) => {
  try {
    let query = "SELECT * FROM users WHERE id = ?";
    let [results] = await (await conn()).query(query, [userId]);
    let User = results;
    return User;
  } catch (err) {
    return { err };
  }
};

export const activateUser = async (userId) => {
  try {
    let query = "UPDATE users SET is_verified = 1 where id = ?";
    let [results] = await (await conn()).query(query, [userId]);
    let User = results[0];
    return User;
  } catch (err) {
    return { err };
  }
};

export const updatePassword = async (userId, password) => {
  try {
    let query = "UPDATE users SET password = ? where id = ?";
    let [results] = await (await conn()).query(query, [password, userId]);
    let User = results[0];
    return User;
  } catch (err) {
    return { err };
  }
};

export const insert = async (UserInfo) => {
  try {
    let query = `INSERT INTO users ( role_id, name, email, password, activate_link) values (?)`;
    let results = await (await conn()).query(query, [UserInfo]);
    return results[0].insertId;
  } catch (error) {
    return { error };
  }
}

export const insertSlot = async (slotTime) => {
  try {
    let query = `INSERT INTO slot_master (garage_id,start_time,end_time) values (?)`;
    let results = await (await conn()).query(query, [slotTime])
    return results[0].insertId;
  } catch (error) {
    return { error }
  }
}

export const updateSlot = async (slotTime) => {
  try {
    let query = `UPDATE slot_master set start_time = ?,end_time = ? where id =?`;
    let results = await (await conn()).query(query, [slotTime[0], slotTime[1], slotTime[2]]);
    return results[0];
  } catch (error) {
    return { error }
  }
}

export const deleteSlot = async (slotId) => {
  try {
    let query = `UPDATE slot_master set is_deleted = 1 where id = ?`
    let results = await (await conn()).query(query, [slotId])
    return results[0]
  } catch (error) {
    return { error }
  }
}

export const updateUserById = async (userInfo) => {
  try {
    let query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    let results = await (await conn()).query(query, userInfo);
    return results[0].affectedRows
  } catch (error) {
    return { error };
  }
};

export const findAddressById = async (userId) => {
  try {
    let query = `SELECT * FROM user_address WHERE user_id = ?`
    let [results] = await (await conn()).query(query, [userId]);
    let address = results[0];
    return address;
  } catch (error) {
    return { error }
  }
}

export const insertAddress = async (userInfo) => {
  try {
    let query = `INSERT INTO address_master (city_id, area, pincode) VALUES (?)`
    let results = await (await conn()).query(query, [userInfo]);
    return results[0].insertId;
  } catch (error) {
    return { error }
  }
}

export const insertUserAddress = async (userInfo) => {
  try {
    let query = `INSERT INTO user_address (user_id, address_id) VALUES (?)`
    let results = await (await conn()).query(query, [userInfo]);
    return results[0].insertId;
  } catch (error) {
    return { error }
  }
}

export const updateAddressById = async (userInfo) => {
  try {
    let query = `UPDATE address_master SET city_id = ?, area = ?, pincode = ? WHERE id = ?`
    let results = await (await conn()).query(query, userInfo);
    return results[0].affectedRows;
  } catch (error) {
    return { error }
  }
}

// garage insert
export const insertGarage = async (garageInfo) => {
  try {
    let query = `INSERT INTO garage_master (garage_name, contact_number, email, thumbnail, open_time, close_time, description) values (?)`;
    let result = await (await conn()).query(query, [garageInfo]);
    return result[0].insertId;
  } catch (error) {
    return { error };
  }
}
// owner has garage insert
export const insertGarageOwner = async (ownerInfo) => {
  try {
    let query = `INSERT INTO owner_has_garages (owner_id, garage_id) values (?)`;
    let result = await (await conn()).query(query, [ownerInfo]);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
}
// garage address insert 
export const insertGarageAddress = async (addressInfo) => {
  try {
    let query = `INSERT INTO address_master (city_id, area, pincode) values (?)`;
    let result = await (await conn()).query(query, [addressInfo]);
    return result[0].insertId;
  } catch (error) {
    return { error };
  }
}
// garage addres reference
export const insertGarageReference = async (references) => {
  try {
    let query = `INSERT INTO garage_addresses (address_id, garage_id) values (?)`;
    let result = await (await conn()).query(query, [references]);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
}
// garage update
export const updateGarage = async (garageInfo) => {
  try {
    let query = `UPDATE garage_master SET garage_name= ?, contact_number= ?, email= ?, thumbnail= ?, open_time= ?, close_time= ?,description= ?  WHERE id = ?`;
    let result = await (await conn()).query(query, garageInfo);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
}
// update garage address
export const updateGarageAddress = async (addressInfo) => {
  try {
    let query = `UPDATE address_master SET city_id = ?, area = ?, pincode = ? WHERE id = ?`
    let result = await (await conn()).query(query, addressInfo);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
}
// garage delete
export const deleteGarage = async (garageId, addressId, referenceID) => {
  try {
    let query = `UPDATE garage_master SET is_delete = 1 WHERE id = ?`;
    let query2 = `UPDATE garage_addresses SET is_delete = 1 WHERE id= ?`;
    let query3 = `UPDATE address_master SET is_delete=1 WHERE id= ?`;
    let result = await (await conn()).query(query, [garageId]);
    let result2 = await (await conn()).query(query2, [referenceID]);
    let result3 = await (await conn()).query(query3, [addressId]);
    return result[0].affectedRows;
  } catch (error) {
    return { error };
  }
}
// display garage details
export const displayGarage = async (garageId) => {
  try {
    let query = `SELECT * FROM garage_master  WHERE id= ?`;
    let result = await (await conn()).query(query, [garageId]);
    return result[0];
  } catch (error) {
    return { error }
  }
}

export const findService = async (serviceInfo) => {
  try {
    let query = `SELECT * FROM service_master WHERE name = ?`
    let result = await (await conn()).query(query, [serviceInfo]);
    return result[0];
  } catch (error) {
    return { error }
  }
}

export const insertService = async (serviceInfo) => {
  try {
    let query = `INSERT INTO service_master (name, description, price, availability_status) VALUES (?)`
    let result = await (await conn()).query(query, [serviceInfo]);
    return result[0].insertId;
  } catch (error) {
    return { error }
  }
}

export const insertGarageService = async (serviceInfo) => {
  try {
    let query = `INSERT INTO garage_has_services (garage_id, services_id) VALUES (?)`
    let result = await (await conn()).query(query, [serviceInfo]);
    return result[0].insertId;
  } catch (error) {
    return { error }
  }
}

export const findGarageService = async (serviceInfo) => {
  try {
    let query = `SELECT * FROM garage_has_services WHERE garage_id = ? AND services_id = ?`;
    let result = await (await conn()).query(query, serviceInfo);
    return result[0];
  } catch (error) {
    return { error }
  }
}

export const updateGarageService = async (serviceInfo) => {
  try {
    let query = `UPDATE garage_has_services SET is_deleted = 0 WHERE garage_id = ? AND services_id = ?`;
    let result = await (await conn()).query(query, serviceInfo);
    return result[0].affectedRows;
  } catch (error) {
    return { error }
  }
}

export const deleteGarageService = async (serviceInfo) => {
  try {
    let query = `UPDATE garage_has_services SET is_deleted = 1 WHERE garage_id = ? AND services_id = ?`;
    let result = await (await conn()).query(query, serviceInfo);
    return result[0].affectedRows;
  } catch (error) {
    return { error }
  }
}

export const selectByTableName = async (tableName) => {
  try {
    let query = "SELECT * FROM " + tableName + ";";
    let [results] = await (await conn()).query(query);
    return results;
  } catch (err) {
    return { err };
  }
}

export const selectById = async (tableName, id) => {
  try {
    let query = "SELECT * FROM " + tableName + "WHERE id = ?";
    let [results] = await (await conn()).query(query, [id]);
    return results;
  } catch (err) {
    return { err };
  }
}

