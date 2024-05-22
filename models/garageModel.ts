import { responseHandler } from "../helpers/responseHandler.js";

export class garageModel {
  static async count(ownerId) {
    return await responseHandler.fetchData({
      fetchFunc: "selectWithJoin",
      payload: {
        tables: ["owner_has_garages", "garage_master"],
        function: ["COUNT(*) as count"],
        joinOn: "owner_has_garages.garage_id = garage_master.id",
        where: ["garage_master.is_deleted", "owner_has_garages.owner_id"],
        value: [0, ownerId],
      },
      message: {},
      res: undefined,
    });
  }
  static async getAppointment(garageId) {
    return await responseHandler.fetchData({
      fetchFunc: "selectWithJoin",
      payload: {
        tables: [
          "appointments",
          "slot_master",
          "appointment_payments",
          "users",
        ],
        columns: [
          ["id AS appointment_id", "invoice_url"],
          ["start_time"],
          ["status AS payment_status"],
          ["name AS customer_name", "email AS customer_email"],
        ],
        joinOn:
          "appointments.slot_id = slot_master.id AND appointment_payments.appointment_id = appointments.id AND users.id = appointments.customer_id",
        where: ["slot_master.garage_id"],
        value: [garageId],
      },
      message: {},
      res: undefined,
    });
  }
}
