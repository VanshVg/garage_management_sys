import { validationResult } from "express-validator";
import {
  deleteFromService,
  deleteGarageService,
  findGarageService,
  findService,
  insertGarageService,
  insertService,
  updateGarageService,
} from "../utils/dbHandler.js";

export const addService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(301)
        .json({ success: false, message: "Invalid payload" });
    }
    let { garageId, price } = req.body;
    let serviceId = req.body.serviceId;
    // let thumbnail = req.file?.filename || "";
    if (serviceId == undefined) {
      //add service
      let { serviceName, description } = req.body;
      const resultId = await insertService([serviceName, description]);
      if (!resultId) {
        return res
          .status(301)
          .json({ success: false, message: "something went wrong" });
      } else serviceId = resultId;
    }
    let garageResult = await insertGarageService([garageId, serviceId, price]);
    if (!garageResult) {
      return res
        .status(301)
        .json({ success: false, message: "Something went wrong!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Service added successfully" });
  } catch (err) {
    return res.status(301).json({ success: false, message: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    let id = req.params.id || 0;
    let garageResult = await deleteGarageService([id]);
    if (!garageResult) {
      return res
        .status(301)
        .json({ success: false, message: "Something went wrong!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    return res.status(301).json({ success: false, message: err.message });
  }
};
