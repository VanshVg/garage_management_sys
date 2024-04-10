import conn from "../config/dbConfig.js";

export const findOne = async (email) => {
  console.log(email);
  try {
    let query = "SELECT * FROM users WHERE email = ?";
    let [results] = await (await conn()).query(query, [email]);
    let User = results[0];
    return User;
  } catch (err) {
    return { err };
  }
}

export const findOneById = async (userId) => {
  try {
    let query = "SELECT * FROM users WHERE id = ?";
    let [results] = await (await conn()).query(query, [userId]);
    let User = results[0];
    return User;
  } catch (err) {
    return { err };
  }
}

export const activateUser = async (userId) => {
  try {
    let query = "UPDATE users SET is_verified = 1 where user_id = ?";
    let [results] = await (await conn()).query(query, [userId]);
    let User = results[0];
    return User;
  } catch (err) {
    return { err };
  }
}

export const insert = async (UserInfo) => {
  try {
    console.log(UserInfo)
    let query = `INSERT INTO users ( role_id, name, email, password, activate_link) values (?)`;
    let results = await (await conn()).query(query, [UserInfo]);
    return results[0].insertId;
  } catch (error) {
    return { error };
  }
}
// garage insert
export const insertGarage = async (garageInfo) => {
  try {
    console.log(garageInfo);
    let query = `INSERT INTO garage_master (garage_name, contact_number, email, thumbnail, open_time, close_time, description,address_id) values (?)`;
    let result = await (await conn()).query(query, [garageInfo]);
    console.log(result);
    return result[0].insertId;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
// owner has garage insert
export const insetGargeOwner = async (ownerInfo) => {
  try {
    let query = `INSERT INTO owner_has_garages (owner_id, garage_id) values (?)`;
    let result = await (await conn()).query(query, [ownerInfo]);
    return result[0].insertId;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
// garage address insert 
export const insertGarageAddress = async (addressInfo) => {
  try {
    let query = `INSERT INTO address_master (resident_id, city_id, area, pincode) values (?)`;
    let result = await (await conn()).query(query, [addressInfo]);
    return result[0].insertId;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
// garage update
export const updateGarage = async (garageInfo) => {
  try {
    console.log(garageInfo);
    let query = `UPDATE garage_master SET garage_name= ?, contact_number= ?, email= ?, thumbnail= ?, open_time= ?, close_time= ?,description= ?  WHERE id = ?`;
    let result = await (await conn()).query(query, [garageInfo]);
  } catch (error) {
    return { error };
  }
}
// garage delete
export const deleteGarage = async (garageId) => {
  try {
    console.log(garageId);
    let query = `UPDATE garage_master SET is_delete = 1 WHERE id = ?`;
    let result = await (await conn()).query(query, [garageId]);
  } catch (error) {
    return { error };
  }
}
