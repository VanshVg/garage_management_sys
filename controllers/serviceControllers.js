import { validationResult } from "express-validator";
import {
  countServices,
  deleteGarageService,
  getNotAvailableService,
  getOwnerService,
  getServices,
  insertGarageService,
  insertService,
  serviceListing,
  servicesCount,
} from "../utils/dbHandler.js";
import { logger } from "../helpers/logger.js";

// add new service to a garage
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

    if (serviceId == undefined) {
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
  } catch (error) {
    logger.error(error);
    return res.status(301).json({ success: false, message: err.message });
  }
};

// delete service from garage with id
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
  } catch (error) {
    logger.error(error);
    return res.status(301).json({ success: false, message: err.message });
  }
};

// get all services of a specific garage
export const servicesListing = async (req, res) => {
  let { garageId } = req.params;
  try {
    const servicesList = await serviceListing(garageId);
    res.json({ success: true, result: servicesList });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all the services available on the platform
export const allServices = async (req, res) => {
  try {
    const services = await getServices();
    res.status(201).json({ success: true, services });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// count number of services provided by owner garages
export const getServiceCount = async (req, res) => {
  try {
    const serviceCount = await countServices(req.user.id);
    res.status(201).json({ success: true, serviceCount });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

// find services for owner with garage id
export const findOwnerService = async (req, res) => {
  try {
    const { garageId } = req.body;
    const services = await getOwnerService(req.user.id, garageId);
    res.status(201).json({ success: true, services });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// count number of services available on the platform
export const serviceCount = async (req, res) => {
  try {
    let result = await servicesCount();
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

// get services not available in a garage
export const getGarageNotService = async (req, res) => {
  try {
    let id = req.params.id;
    const services = await getNotAvailableService([id]);
    res.status(201).json({ services });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};