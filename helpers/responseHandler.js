import { dbHandler } from "../utils/dbHandler2";
export class responseHandler {
  static async sendResponse() {}
  static async fetchData(res, fetchFunc, payload, message) {
    try {
      let data = await dbHandler[fetchFunc](payload);
      await responseHandler.sendResponse({
        res,
        message: message.success,
        data,
        code: 200,
      });
    } catch (error) {
      logger.error(error);
      await responseHandler.sendResponse({
        res,
        message: message.error,
        code: 503,
      });
    }
  }
}
