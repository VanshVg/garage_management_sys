import { validationResult } from "express-validator";
import { deleteSlot, getAllSlots, getAppointsByDateRange, insertSlot, updateSlot } from "../utils/dbHandler.js";


export const slotBooking = async (req, res) => {
  try {
    const { garageId, startTime, endTime } = req.body;
    console.log(garageId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(301).json({ success: false, errors: errors.array() });
    } else {
      const result = await insertSlot([garageId, startTime, endTime, 1]);
      if (!result)
        res.status(301).json({ success: false, message: "something went wrong" });
      else if (result.error) {
        res.status(301).json({
          success: false,
          message: "error adding slot please try again",
        });
      } else res.status(201).json({ message: "slot inserted successfully" });
    }
  } catch (error) {
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
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

export const slotDelete = async (req, res) => {
  try {
    const slotId = req.params.slotId;
    const result = await deleteSlot([slotId]);
    if (result) {
      res.status(201).json({ success: true, message: "slot was deleted successfully" });
    } else {
      res.status(301).json({ success: false, message: "slot was not deleted" });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

export const getSlots = async (req, res) => {
  try {
    const { startIndex, endIndex } = req.pagination;
    const garage = req.query.garage;

    const userExist = req.user;

    const result = await getAllSlots(startIndex, garage, userExist.id);
    const totalPage = Math.ceil(result[1][0].count / 10);

    res.json({
      result: result[0],
      count: result[1][0].count,
      startIndex: startIndex,
      endIndex: endIndex,
      totalPage: totalPage,
    });
  } catch (error) {
    console.error("Error in getSlots:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const appointmentsByDateRange = async (req, res) => {
  try {
    const { garageId, startDate, endDate } = req.body;
    const result = await getAppointsByDateRange([startDate, endDate, garageId]);
    res.status(201).json({ success: true, appointments: result });
  }
  catch (error) {
    res.status(502).json({ success: false, message: "something went wrong" })
  }
}
