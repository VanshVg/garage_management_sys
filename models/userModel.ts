import { responseHandler } from "../helpers/responseHandler.js";

export class userModel {
  static async updateProfile(value) {
    let col = ["name", "bio", "profile_pic"];
    if (value[2] == "") {
      col.pop();
      value.splice(2, 1);
    }
    return await responseHandler.fetchData({
      fetchFunc: "update",
      payload: {
        table: "users",
        columns: col,
        value: value,
        where: ["email"],
      },
      message: {},
      res: undefined,
    });
  }
}
