import { getCity, getState } from "../utils/dbHandler.js";
import { logger } from "../helpers/loger.js";

export const stateList = async (req, res) => {
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

export const cityList = async (req, res) => {
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

