import { responseHandler } from "../helpers/responseHandler.js";

export class appointmentModel {
  static async fetchAll() {}
  static async count(ownerId, status) {
    return await responseHandler.fetchData({
      fetchFunc: "selectWithJoin",
      payload: {
        tables: ["owner_has_garages", "slot_master", "appointments"],
        function: ["COUNT(*) as count"],
        joinOn:
          "owner_has_garages.garage_id = slot_master.garage_id AND slot_master.id =appointments.slot_id",
        where: ["owner_has_garages.owner_id", "appointments.status"],
        value: [ownerId, status],
      },
      message: {},
      res: undefined,
    });
  }
  static async updateBooking(status, id, res) {
    return await responseHandler.fetchData({
      fetchFunc: "update",
      payload: {
        table: "appointments",
        columns: ["status"],
        value: [status, id],
        where: ["id"],
      },
      message: {
        success: "Appointment updated successfully!",
        error: "Appointment updatedation faileappointments..",
      },
      res: res,
    });
  }
  static async getBooked(ownerId) {
    return await responseHandler.fetchData({
      fetchFunc: "selectWithJoin",
      payload: {
        tables: [
          "owner_has_garages",
          "garage_master",
          "slot_master",
          "appointments",
          "users",
        ],
        columns: [
          [],
          ["garage_name as garageName"],
          ["start_time as startTime", "end_time as endTime"],
          ["id"],
          ["name as customerName"],
        ],
        join: ["INNER", "INNER"],
        joinOn:
          "owner_has_garages.garage_id = garage_master.id and owner_has_garages.garage_id = slot_master.garage_id and slot_master.id = appointments.slot_id and appointments.customer_id = users.id AND slot_master.start_time>= now()",
        where: ["appointments.status", "owner_has_garages.owner_id"],
        orderBy: 1,
        value: [2, ownerId],
      },
      message: {},
      res: undefined,
    });
  }
}
