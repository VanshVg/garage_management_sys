import { resolve } from "path";
import {
  countAppointments,
  getAppointments,
  getBookedAppointments,
  handleUpdateAppointments,
  insertData,
  selectByFieldName,
  selectByFieldNames,
  updateFields,
  getNotifications
} from "../utils/dbHandler.js";

import {getInstance} from "../utils/socket.js"

export const appointmentsListing = async (req, res) => {
  try {
    let garage = req.params.garageId || 1;
    const appointments = await getAppointments([garage, req.user.id]);
    appointments.forEach((appointment) => {
      appointment.date = appointment.startTime.slice(0, 10);
      appointment.startTime = appointment.startTime.slice(11, 16);
      appointment.endTime = appointment.endTime.slice(11, 16);
    });
    res.status(201).json({ success: true, appointments });
  } catch (error) {
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
    
    let userId = req.user.id;

    const notification = await getNotifications(userId);
      
    const io = getInstance();

    io.on("connection", async (socket) => {
        socket.emit('notification',notification);
    })

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
    const { garageId, serviceId, vehicleId, slotId } = req.body;
    const { email } = req.user;
    let user = await selectByFieldName("users", "email", email);
    if (user.length < 1) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorised used" });
    }

    let slot = await selectByFieldName("slot_master", "id", slotId);
    if (!slot[0].availability_status) {
      return res
        .status(403)
        .json({ success: false, message: "Selected slot is already used" });
    }
    let customerId = user[0].id;

    let appointmentResult = await insertData(
      "appointments",
      ["slot_id", "customer_id", "vehicle_id"],
      [slotId, customerId, vehicleId]
    );
    if (!appointmentResult.insertId) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
    let appointmentId = appointmentResult.insertId;
    let sub_total = 0;
    let servicePromise = new Promise((resolve) => {
      serviceId.forEach(async (element) => {
        try {
          let serviceResult = await selectByFieldNames("garage_has_services", {
            garage_id: garageId,
            services_id: element,
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
    console.log(error);
    res.status(501).json({ success: false, message: "Something went wrong!" });
  }
};
