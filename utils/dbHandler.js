import conn from "../config/dbConfig.js";

export const findOne = async (email) => {
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