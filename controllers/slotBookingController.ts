import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  deleteSlot,
  getAllSlots,
  getAppointsByDateRange,
  insertSlot,
  updateSlot,
  bookSlotService,
} from "../utils/dbHandler";
import { logger } from "../helpers/logger";
import {
  RequestWithPagination,
  getAllSlotsInterface,
  paginationInterface,
  userInterface,
} from "../interfaces/interface";
import { ResultSetHeader } from "mysql2";

// slot booking by customer
export const slotBooking = async (req: Request, res: Response) => {
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
      else {
        res
          .status(201)
          .json({ success: true, message: "slot inserted successfully" });
      }
    }
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

// update slot timings -- not needed
export const slotUpdate = async (req: Request, res: Response) => {
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

// delete a slot with id
export const slotDelete = async (req: Request, res: Response) => {
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

// get all slots of a specific garage
export const getSlots = async (req: RequestWithPagination, res: Response) => {
  try {
    const { startIndex, endIndex } = req.pagination as paginationInterface;
    const garage = req.query.garage;
    const user = req.user as userInterface;

    const result: Array<Array<getAllSlotsInterface>> = (await getAllSlots(
      startIndex,
      garage,
      user.id
    )) as unknown as Array<Array<getAllSlotsInterface>>;

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

// get appointments between specified date range
export const appointmentsByDateRange = async (req: Request, res: Response) => {
  try {
    const { garageId, startDate, endDate } = req.body;
    const result = await getAppointsByDateRange([startDate, endDate, garageId]);
    res.status(201).json({ success: true, appointments: result });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// slot booking for customer
export const bookSlot = async (req: Request, res: Response) => {
  try {
    const user = req.user as userInterface;
    const slotId = req.body.slotId;

    const [result]: Array<ResultSetHeader> = (await bookSlotService(
      user.id,
      slotId
    )) as Array<ResultSetHeader>;

    if (result) {
      res
        .status(200)
        .json({ success: true, message: "Slot Added Successfully" });
    } else {
      res.status(404).json({ success: false, message: "Slot is not added" });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Something Went Wrong!" });
  }
};
