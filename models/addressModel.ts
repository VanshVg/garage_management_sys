// import { getCity, getState } from "../utils/dbHandler.js";
import { responseHandler } from "../helpers/responseHandler.js";
import { Response } from "express";
class addressModel {
  static async stateList(res: Response) {
    responseHandler.fetchData(res, "select");
  }
  static async cityList() {}
}
