import conn from "../config/dbConfig";
export class dbHandler {
  static async insert(tableName: string, fields: [], values: []) {
    try {
      let query = `INSERT INTO ${tableName} (${fields}) VALUES(?);`;
      let result = await conn.query(query, [values]);
      return result[0];
    } catch (error) {
      return { error };
    }
  }
  static async update(
    tableName: string,
    fields: [],
    values: [],
    columnName: string,
    columnValue: string
  ) {
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
  static async deleteFrom(tableName: string, fieldName: string, values: []) {
    try {
      let query = `DELETE FROM ${tableName} WHERE ${fieldName} = ?;`;
      let result = await conn.query(query, values);
      return result[0];
    } catch (error) {
      return { error };
    }
  }
  static async select(tableName: string) {
    try {
      let query = "SELECT * FROM " + tableName + " where is_deleted=0;";
      let result = await conn.query(query);
      return result[0];
    } catch (err) {
      return { err };
    }
  }
  static async findOne(email: string) {
    try {
      let query = "SELECT * FROM users WHERE email = ?";
      let [result] = await conn.query(query, [email]);
      return result;
    } catch (error) {
      return { error };
    }
  }
}
