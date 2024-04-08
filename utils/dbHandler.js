import conn from "../config/dbConfig.js";

export const findOne = async (email) {
  try {
    let query =
      "select firstName as username,id as userId,password from users where email=?";
    let [results] = await conn.query(query, [email]);
    let User = results[0];
    return User;
  } catch (error) {
    return { error };
  }
}
export const insert = async (UserInfo) => {
  try {
    let query = `insert into users ( id,firstName,email,password,role_id,activate_link) values (?,?,?,?,)`;
    let results = await conn.query(query);
    return results[0].affectedRows;
  } catch (error) {
    return { error };
  }
}