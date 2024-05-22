import { Request, Response } from "express";
import { getCity, getState } from "../utils/dbHandler";
import { logger } from "../helpers/logger";

// return list of states
export const stateList = async (req: Request, res: Response) => {
  try {
    let state = await getState();
    res.status(200).json({
      success: true,
      state: state,
      message: "Success State List Found...",
    });
  } catch (error) {
    logger.error(error);
    res.status(503).json({
      success: false,
      message: "Internal Server Error..!!",
    });
  }
};

// return list of cities with state id
export const cityList = async (req: Request, res: Response) => {
  let stateId = req.params.stateId;
  try {
    let city = await getCity(stateId);
    res.status(200).json({
      success: true,
      city: city,
      message: "Success City List Found...",
    });
  } catch (error) {
    logger.error(error);
    res.status(503).json({
      success: false,
      message: "Internal Server Error..!!",
    });
  }
};
