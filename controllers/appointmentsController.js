import { logger } from "../helpers/loger.js";
import {
  getOwnerGarages,
  countAppointments,
  getAppointments,
  getBookedAppointments,
  handleUpdateAppointments,
  insertData,
  selectByFieldName,
  selectByFieldNames,
  updateFields,
  getNotifications,
  userNotification,
} from "../utils/dbHandler.js";
import { error, log } from "console";

export const appointmentsListing = async (req, res) => {
  try {
    let ownerId = req.user.id;
    const garages = await getOwnerGarages(ownerId);

    if (!garages) {
      res.status(301).json({ success: false, message: "Something went wrong" });
    }

    let garage = garages[0].garage_id;
    garage = req.params.garageId || garage;

    const appointments = await getAppointments([garage, req.user.id]);
    appointments.forEach((appointment) => {
      appointment.date = appointment.startTime.slice(0, 10);
      appointment.startTime = appointment.startTime.slice(11, 16);
      appointment.endTime = appointment.endTime.slice(11, 16);
    });
    res.status(201).json({ success: true, appointments });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

export const bookedAppointments = async (req, res) => {
  try {
    let result = await getBookedAppointments(req.user.id);
    let appointments = [];
    result.forEach((res) => {
      let temp = {};
      temp.garageName = res.garageName;
      temp.customerName = res.customerName;
      temp.date = res.startTime.slice(0, 11);
      temp.startTime = res.startTime.slice(11, 16);
      temp.endTime = res.endTime.slice(11, 16);
      appointments.push(temp);
    });
    res.status(201).json({ success: false, appointments });
  } catch (error) {
    logger.log(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

export const getAppointmentCount = async (req, res) => {
  try {
    const { pending, successful, cancelled } = await countAppointments(
      req.user.id
    );
    res.status(201).json({ success: true, pending, successful, cancelled });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    let { appointmentId, id } = req.body;
    let result = await handleUpdateAppointments(
      id == 1 ? "2" : "3",
      appointmentId
    );
    if (!result) throw "Something went wrong";

    res.status(201).json({
      success: true,
      message: "Appointment updated successfully!",
    });
  } catch (error) {
    res.status(501).json({ success: false, message: "Something went wrong!" });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { serviceId, vehicleId, slotId } = req.body;
    let slot = await selectByFieldName("slot_master", "id", slotId);
    if (!slot[0].availability_status) {
      return res
        .status(403)
        .json({ success: false, message: "Selected slot is already used" });
    }

    let appointmentResult = await insertData(
      "appointments",
      ["slot_id", "customer_id", "vehicle_id", "status"],
      [slotId, req.user.id, vehicleId, 1]
    );
    if (!appointmentResult.insertId) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
    let appointmentId = appointmentResult.insertId;
    let sub_total = 0;
    let servicePromise = new Promise((resolve) => {
      serviceId?.split(",").forEach(async (element) => {
        try {
          let serviceResult = await selectByFieldNames("garage_has_services", {
            id: element,
          });
          if (serviceResult.length < 1) {
            return res
              .status(500)
              .json({ success: false, message: "Something went wrong!" });
          }
          sub_total += serviceResult[0].price;
          let appointmentServiceResult = await insertData(
            "appointment_services",
            ["service_id", "appointment_id"],
            [element, appointmentId]
          );
          if (!appointmentServiceResult.insertId) {
            return res
              .status(500)
              .json({ success: false, message: "Something went wrong!" });
          }
          resolve(sub_total);
        } catch (error) {
          return res
            .status(501)
            .json({ success: false, message: "Something went wrong!" });
        }
      });
    });

    await servicePromise;

    let gst_amount = (sub_total * 12) / 100;

    let paymentResult = await insertData(
      "appointment_payments",
      ["appointment_id", "sub_total", "gst_amount"],
      [appointmentId, sub_total, gst_amount]
    );
    if (!paymentResult.insertId) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }

    let slotResult = await updateFields(
      "slot_master",
      { availability_status: 0 },
      { id: slotId }
    );
    if (!slotResult.affectedRows) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment has been booked successfully",
    });
  } catch (error) {
    logger.error(error);
    res.status(501).json({ success: false, message: "Something went wrong!" });
  }
};

export const notification = async (req, res) => {
  try {
    let userId = req.user.id;
    let notifications = await getNotifications(userId);

    if (!notifications) {
      logger.error(error);
      res.status(301).json({ success: false, message: "Something went wrong" });
    }

    res.status(200).json({ success: true, notifications });
  } catch (err) {
    logger.error(error);
    res.status(501).json({ success: false, message: "Something went wrong!" });
  }
};

export const customerNotification = async (req, res) => {
  try {
    let userId = req.user.id;
    let notification = await userNotification(userId);

    if (!notification) {
      logger.error(error);
      res.status(301).json({ success: false, message: "Something went wrong" });
    }

    res.status(200).json({ success: true, notification });
  } catch (err) {
    logger.error(error);
    res.status(501).json({ success: false, message: "Something went wrong!" });
  }
};
