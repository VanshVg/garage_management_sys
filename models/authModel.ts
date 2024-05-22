import { responseHandler } from "../helpers/responseHandler.js";

export class authModel {
  static async attemptCount(user_id, attempt_sys_ip) {
    return await responseHandler.fetchData({
      fetchFunc: "select",
      payload: {
        table: "login_logs",
        where: ["user_id", "attempt_sys_ip"],
        value: [user_id, attempt_sys_ip],
      },
      message: {
        success: "tried more attempts..",
        error: "first attemt..",
      },
      res: undefined,
    });
  }
  static async firstAttempt(user_id, attempt_sys_ip) {
    return await responseHandler.fetchData({
      fetchFunc: "insert",
      payload: {
        table: "login_logs",
        columns: ["user_id", "attempt_count", "attempt_sys_ip"],
        value: [user_id, 1, attempt_sys_ip],
      },
      message: {
        success: "first attempts..",
        error: "something wrong..",
      },
      res: undefined,
    });
  }
  static async nextAttempt(user_id, counter, attempt_sys_ip) {
    return await responseHandler.fetchData({
      fetchFunc: "update",
      payload: {
        table: "login_logs",
        columns: ["attempt_count", "attempt_sys_ip"],
        value: [counter + 1, attempt_sys_ip, user_id],
        where: ["user_id"],
      },
      message: {
        success: "attempts counted..",
        error: "something wrong..",
      },
      res: undefined,
    });
  }
  static async register(value) {
    return await responseHandler.fetchData({
      fetchFunc: "insert",
      payload: {
        table: "users",
        columns: ["role_id", "name", "email", "password", "activate_link"],
        value: value,
      },
      message: {},
      res: undefined,
    });
  }
  static async activateAccount(id, token, res) {
    let data = await responseHandler.fetchData({
      fetchFunc: "select",
      payload: {
        table: "users",
        where: ["id", "activate_link"],
        value: [id, token],
      },
      message: {},
      res: undefined,
    });
    if (data) {
      return await responseHandler.fetchData({
        fetchFunc: "update",
        payload: {
          table: "users",
          columns: ["is_verified"],
          value: [1, id],
          where: ["id"],
        },
        message: {
          success: "Your account is activated please login to continue",
          error: "Invalid token or token expired",
        },
        res: res,
        render: { path: { success: "auth/success", error: "login/error" } },
      });
    } else {
      responseHandler.renderPage(
        res,
        "login/error",
        false,
        "Invalid token or token expired"
      );
    }
  }
  static async resetPassword(value, res) {
    return await responseHandler.fetchData({
      fetchFunc: "update",
      payload: {
        table: "users",
        columns: ["password"],
        value: value,
        where: ["id"],
      },
      message: {
        success: "password updated successfully",
        error: "something wen't wrong..",
      },
      res: value,
    });
  }
}
