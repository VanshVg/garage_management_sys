import conn from "../config/dbConfig";

// dynamic insert with table name, fields and respective values
export const insert = async (
  tableName: string,
  fields: Array<string>,
  values: Array<string | number>
) => {
  try {
    let query = `INSERT INTO ${tableName} (${fields}) VALUES(?);`;
    let result = await conn.query(query, [values]);
    return result[0];
  } catch (error) {
    return { error };
  }
};

// dynamic update with table name, fields, values, column name and column values of conditions
export const update = async (
  tableName: string,
  fields: Array<string>,
  values: Array<string | number>,
  columnName: string,
  columnValue: string
) => {
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
};

// dynamic delete with table name and condition fields and values
export const deleteFrom = async (
  tableName: string,
  fieldName: string,
  values: Array<string | number>
) => {
  try {
    let query = `DELETE FROM ${tableName} WHERE ${fieldName} = ?;`;
    let result = await conn.query(query, values);
    return result[0];
  } catch (error) {
    return { error };
  }
};

// dynamic select with table name
export const select = async (tableName: string) => {
  try {
    let query = "SELECT * FROM " + tableName + ";";
    let result = await conn.query(query);
    return result[0];
  } catch (err) {
    return { err };
  }
};

// get user details with email id
export const findOne = async (email: string[]) => {
  try {
    let query = "SELECT * FROM users WHERE email = ?";
    let [result] = await conn.query(query, [email]);
    return result;
  } catch (error) {
    return { error };
  }
};
