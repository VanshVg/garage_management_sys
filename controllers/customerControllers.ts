import { Request, Response } from "express";
import {
  customerSlotListing,
  customersCount,
  getCustomerAppointments,
  getCustomerNames,
  ifFeedbackExist,
  insertFeedback,
} from "../utils/dbHandler";
import { logger } from "../helpers/logger";
import {
  RequestWithPagination,
  feedbacksInterface,
  getCustomerAppointmentsInterface,
  paginationInterface,
  userInterface,
} from "../interfaces/interface";

// get customer details
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const result = await getCustomerNames(1);
    res.status(201).json({ success: true, result: result });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "something went wrong!" });
  }
};

// get slots for specific date with garage id for customers
export const customerSlotSelection = async (req: Request, res: Response) => {
  try {
    let { garageId, date } = req.params;
    let date2 = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000);
    let newdate2 = date2.toISOString().slice(0, 10);
    const result = await customerSlotListing(garageId, date, newdate2);
    res.status(201).json({ success: true, result });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "something went wrong" });
  }
};

// insert feedback data submitted by customer
export const CustomerFeedbackPost = async (req: Request, res: Response) => {
  try {
    let { customerId, garageId, rating, message } = req.body;
    var customerFeedback: Array<feedbacksInterface> = (await ifFeedbackExist(
      customerId
    )) as Array<feedbacksInterface>;
    if (customerFeedback.length > 0) {
      return res.status(301).json({ success: false, message: "already Exist" });
    } else {
      const result = await insertFeedback(
        garageId,
        customerId,
        message,
        rating
      );
      if (!result) {
        res
          .status(301)
          .json({ success: false, message: "Something went wrong!" });
      } else {
        res
          .status(201)
          .send({ success: true, message: "user feedback accepted" });
      }
    }
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// get appointments of customer
export const showAppointments = async (
  req: RequestWithPagination,
  res: Response
) => {
  try {
    const { startIndex, endIndex, limit } =
      req.pagination as paginationInterface;
    let appointments: Array<Array<getCustomerAppointmentsInterface>> =
      (await getCustomerAppointments(
        (req.user as userInterface).id,
        startIndex
      )) as Array<Array<getCustomerAppointmentsInterface>>;
    return res.status(200).json({
      success: true,
      result: appointments[0],
      pagination: {
        totalRecords: appointments[1][0].count,
        startIndex,
        endIndex,
        totalPages: Math.ceil(appointments[1][0].count / limit),
      },
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }
};

// find number of customer for an owner
export const customerCount = async (req: Request, res: Response) => {
  try {
    let result: Array<{ count: number }> = (await customersCount()) as Array<{
      count: number;
    }>;
    let count = result[0].count;
    if (count > 1000) count = 1000;
    else if (count > 100) count = 100;
    else if (count > 10) count = 10;
    res.status(201).json({ success: true, count });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};
