import { validationResult } from "express-validator";
import {
  deleteSlot,
  getAllSlots,
  getAppointsByDateRange,
  insertSlot,
  updateSlot,
  bookSlotService,
} from "../utils/dbHandler.js";
import { findOne } from "../utils/common.js";
import { logger } from "../helpers/loger.js";
import { Socket } from "socket.io";

export const slotBooking = async (req, res) => {
  try {
    const { garageId, startTime, endTime } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(301).json({ success: false, errors: errors.array() });
    } else {
      const result = await insertSlot([garageId, startTime, endTime, 1]);
      if (!result)
        res
          .status(301)
          .json({ success: false, message: "something went wrong" });
      else if (result.error) {
        res.status(301).json({
          success: false,
          message: "error adding slot please try again",
        });
      } else {
        res.status(201).json({ success: true, message: "slot inserted successfully" });
      }
    }
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

export const slotUpdate = async (req, res) => {
  try {
    const { startTime, endTime, slotId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(301).json({ success: false, errors: errors.array() });
    } else {
      const result = await updateSlot([startTime, endTime, slotId]);
      if (result) {
        res.status(201).json({ message: "slot updated successfully" });
      } else {
        res.status(301).json({ message: "slot was not updated" });
      }
    }
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

export const slotDelete = async (req, res) => {
  try {
    const slotId = req.params.slotId;
    const result = await deleteSlot([slotId]);
    if (result) {
      res
        .status(201)
        .json({ success: true, message: "slot was deleted successfully" });
    } else {
      res.status(301).json({ success: false, message: "slot was not deleted" });
    }
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

export const getSlots = async (req, res) => {
  try {
    const { startIndex, endIndex } = req.pagination;
    const garage = req.query.garage;
    const user = req.user.email;

    const userExist = await findOne(user);
    if (!userExist || userExist.length === 0 || !userExist[0].id) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const result = await getAllSlots(startIndex, garage, userExist[0].id);

    const totalPage = Math.ceil(result[1][0].count / 10);

    res.json({
      result: result[0],
      count: result[1][0].count,
      startIndex: startIndex,
      endIndex: endIndex,
      totalPage: totalPage,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const appointmentsByDateRange = async (req, res) => {
  try {
    const { garageId, startDate, endDate } = req.body;
    const result = await getAppointsByDateRange([startDate, endDate, garageId]);
    res.status(201).json({ success: true, appointments: result });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const bookSlot = async (req, res) => {
  try {
    const user = req.user.email;
    const slotId = req.body.slotId;

    const userExist = await findOne(user);
    const [result] = await bookSlotService(userExist[0].id, slotId);

    if (result) {
      res.status(200).json({ success: true, message: "Slot Added Successfully" });
    } else {
      res.status(404).json({ success: false, message: "Slot is not added" });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Something Went Wrong!" });
  }
};
