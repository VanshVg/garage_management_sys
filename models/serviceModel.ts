import { responseHandler } from "../helpers/responseHandler.js";
export class serviceModel {
  static async fetchAll(res) {
    return await responseHandler.fetchData({
      fetchFunc: "select",
      payload: {
        table: "service_master",
        columns: ["id", "name", "description"],
        checkDeleted: true,
      },
      message: {
        success: "service fetch successfully..",
        error: "no service found..",
      },
      res: res,
    });
  }
  static async count() {
    return await responseHandler.fetchData({
      fetchFunc: "select",
      payload: {
        table: "service_master",
        columns: ["COUNT(*) as count"],
        checkDeleted: true,
      },
      message: {},
      res: undefined,
    });
  }
}
