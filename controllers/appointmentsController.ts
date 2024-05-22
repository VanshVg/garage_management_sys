import { Request, Response } from "express";

import { logger } from "../helpers/logger";
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
} from "../utils/dbHandler";
import {
  RequestWithPagination,
  garageInterface,
  garageServicesInterface,
  getAppointmentsInterface,
  getBookedAppointmentsInterface,
  paginationInterface,
  slotMasterInterface,
  userInterface,
} from "../interfaces/interface";
import { ResultSetHeader } from "mysql2";

interface tempInterface {
  garageName: string;
  customerName: string;
  date: string;
  startTime: string;
  endTime: string;
}

// get all the appointments of a specific garage for owner
export const appointmentsListing = async (
  req: RequestWithPagination,
  res: Response
) => {
  try {
    const { page, startIndex, endIndex, limit } =
      req.pagination as paginationInterface;
    let ownerId: number = (req.user as userInterface).id as number;
    const garages: Array<garageInterface> = (await getOwnerGarages(
      ownerId
    )) as Array<garageInterface>;

    if (!garages) {
      res.status(301).json({ success: false, message: "Something went wrong" });
    }

    let garage = req.params.garageId || garages[0].garage_id;

    const appointments: Array<Array<getAppointmentsInterface>> =
      (await getAppointments([
        garage,
        (req.user as userInterface).id,
        startIndex,
        garage,
        (req.user as userInterface).id,
      ])) as Array<Array<getAppointmentsInterface>>;
    appointments[0].forEach((appointment) => {
      appointment.date = appointment.startTime.slice(0, 10);
      appointment.startTime = appointment.startTime.slice(11, 16);
      appointment.endTime = appointment.endTime.slice(11, 16);
    });
    res.status(201).json({
      success: true,
      appointments: appointments[0],
      pagination: {
        totalRecords: appointments[1][0].count,
        page,
        startIndex,
        endIndex,
        totalPages: Math.ceil(appointments[1][0].count / limit),
      },
    });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// get all the booked appointments for owner
export const bookedAppointments = async (req: Request, res: Response) => {
  try {
    let result: Array<getBookedAppointmentsInterface> =
      (await getBookedAppointments(
        (req.user as userInterface).id
      )) as Array<getBookedAppointmentsInterface>;
    let appointments: Array<tempInterface> = [];
    result.forEach((res) => {
      let temp: tempInterface = {} as tempInterface;
      temp.garageName = res.garageName;
      temp.customerName = res.customerName;
      temp.date = res.startTime.slice(0, 11);
      temp.startTime = res.startTime.slice(11, 16);
      temp.endTime = res.endTime.slice(11, 16);
      appointments.push(temp);
    });
    res.status(201).json({ success: false, appointments });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// get number of appointments booked
export const getAppointmentCount = async (req: Request, res: Response) => {
  try {
    const { pending, successful, cancelled } = await countAppointments(
      (req.user as userInterface).id
    );
    res.status(201).json({ success: true, pending, successful, cancelled });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// update status of appointment
export const updateAppointment = async (req: Request, res: Response) => {
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
    logger.error(error);
    res.status(501).json({ success: false, message: "Something went wrong!" });
  }
};

// appointment booking by customer
export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const { serviceId, vehicleId, slotId } = req.body;
    let slot: Array<slotMasterInterface> = (await selectByFieldName(
      "slot_master",
      "id",
      slotId
    )) as Array<slotMasterInterface>;
    if (!slot[0].availability_status) {
      return res
        .status(403)
        .json({ success: false, message: "Selected slot is already used" });
    }

    let appointmentResult: ResultSetHeader = (await insertData(
      "appointments",
      ["slot_id", "customer_id", "vehicle_id", "status"],
      [slotId, (req.user as userInterface).id, vehicleId, 1]
    )) as ResultSetHeader;
    if (!appointmentResult.insertId) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
    let appointmentId = appointmentResult.insertId;
    let sub_total = 0;
    let servicePromise = new Promise((resolve) => {
      serviceId?.split(",").forEach(async (element: string) => {
        try {
          let serviceResult: Array<garageServicesInterface> =
            (await selectByFieldNames("garage_has_services", {
              id: element,
            })) as Array<garageServicesInterface>;
          if (serviceResult.length < 1) {
            return res
              .status(500)
              .json({ success: false, message: "Something went wrong!" });
          }
          sub_total += serviceResult[0].price;
          let appointmentServiceResult: ResultSetHeader = (await insertData(
            "appointment_services",
            ["service_id", "appointment_id"],
            [element, appointmentId]
          )) as ResultSetHeader;
          if (!appointmentServiceResult.insertId) {
            return res
              .status(500)
              .json({ success: false, message: "Something went wrong!" });
          }
          resolve(sub_total);
        } catch (error) {
          logger.error(error);
          return res
            .status(501)
            .json({ success: false, message: "Something went wrong!" });
        }
      });
    });

    await servicePromise;

    let gst_amount = (sub_total * 12) / 100;

    let paymentResult: ResultSetHeader = (await insertData(
      "appointment_payments",
      ["appointment_id", "sub_total", "gst_amount"],
      [appointmentId, sub_total, gst_amount]
    )) as ResultSetHeader;
    if (!paymentResult.insertId) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }

    let slotResult: ResultSetHeader = (await updateFields(
      "slot_master",
      { availability_status: 0 },
      { id: slotId }
    )) as ResultSetHeader;
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

// get pending appointments for owner to count notifications
export const notification = async (req: Request, res: Response) => {
  try {
    let userId = (req.user as userInterface).id;
    let notifications = await getNotifications(userId);

    if (!notifications) {
      logger.error(Error);
      res.status(301).json({ success: false, message: "Something went wrong" });
    }

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    logger.error(error);
    res.status(501).json({ success: false, message: "Something went wrong!" });
  }
};

// get pending appointments for customer to count notifications
export const customerNotification = async (req: Request, res: Response) => {
  try {
    let userId = (req.user as userInterface).id;
    let notification = await userNotification(userId);

    if (!notification) {
      logger.error(Error);
      res.status(301).json({ success: false, message: "Something went wrong" });
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    logger.error(error);
    res.status(501).json({ success: false, message: "Something went wrong!" });
  }
};
