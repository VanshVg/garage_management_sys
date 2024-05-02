// import { getCity, getState } from "../utils/dbHandler.js";
import { responseHandler } from "../helpers/responseHandler.js";
class addressModel {
  static async stateList(res) {
    responseHandler.fetchData(res, "select");
  }
  static async cityList() { }
}