import conn from '../config/dbConfig.js';

// dynamic insert with table name, fields and respective values
export const insert = async (tableName, fields, values) => {
  try {
    let query = `INSERT INTO ${tableName} (${fields}) VALUES(?);`;
    let result = await conn.query(query, [values]);
    return result[0];
  } catch (error) {
    return { error };
  }
}

// dynamic update with table name, fields, values, column name and column values of conditions
export const update = async (tableName, fields, values, columnName, columnValue) => {
  try {
    let res = {};
    let str = "";
    for (let key in fields) {
      str += `${fields[key]} = '${values[key]}', `;
    }
    str = str.slice(0, str.length - 2);

    let query = `UPDATE ${tableName} SET ${str} WHERE ${columnName} = ?;`;
    let result = await conn.query(query, columnValue);
    return result[0];
  } catch (error) {
    return { error };
  }
}

// dynamic delete with table name and condition fields and values
export const deleteFrom = async (tableName, fieldName, values) => {
  try {
    let query = `DELETE FROM ${tableName} WHERE ${fieldName} = ?;`;
    let result = await conn.query(query, values);
    return result[0];
  } catch (error) {
    return { error };
  }
}

// dynamic select with table name
export const select = async (tableName) => {
  try {
    let query = "SELECT * FROM " + tableName + ";";
    let result = await conn.query(query);
    return result[0];
  } catch (err) {
    return { err };
  }
};

// get user details with email id
export const findOne = async (email) => {
  try {
    let query = "SELECT * FROM users WHERE email = ?";
    let [result] = await conn.query(query, [email]);
    return result;
  } catch (error) {
    return { error };
  }
};