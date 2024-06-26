import { getCity, getState } from "../utils/dbHandler.js";
import { Request, Response } from "express";
// garage add
export const stateList = async (req: Request, res: Response) => {
  try {
    let state = await getState();
    res.status(200).json({
      success: true,
      state: state,
      message: "Success State List Found...",
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Internal Server Error..!!",
    });
  }
};

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
    res.status(503).json({
      success: false,
      message: "Internal Server Error..!!",
    });
  }
};
// garage update
