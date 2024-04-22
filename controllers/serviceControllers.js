import { validationResult } from 'express-validator';
import { countServices, deleteFromService, deleteGarageService, findGarageService, findService, getOwnerService, getServices, insertGarageService, insertService, serviceListing, updateGarageService } from '../utils/dbHandler.js';

export const addService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(301).json({ success: false, message: "Invalid payload" });
    }
    let { serviceId, price } = req.body;
    if (serviceId == 'other') {
      let { serviceName, description } = req.body;
      const resultId = await insertService([serviceName, description]);
      if (!resultId) {
        return res.status(301).json({ success: false, message: "something went wrong" });
      }
      let garageResult = await insertGarageService([req.params.garageId, resultId, price]);
      if (garageResult.error) {
        await deleteFromService(resultId);
        return res.status(201).json({ success: false, message: "something went wrong" });
      }
      return res.status(201).json({ success: true, message: "Service added successfully" });
    }
    else {
      let garageId = req.params.garageId;

      let serviceResult = await findGarageService([garageId, serviceId]);
      if (serviceResult.length > 0) {
        if (serviceResult[0].is_deleted == 0) {
          return res.status(301).json({ success: false, message: "Service has already been added" });
        }
        let garageUpdateResult = await updateGarageService([garageId, serviceId, price])
        if (garageUpdateResult) {
          return res.status(200).json({ success: true, message: "Service added successfully" });
        }
      }
      else {
        let garageResult = await insertGarageService([garageId, serviceId, price]);
        if (!garageResult) throw "Something went wrong!";
        res.status(200).json({ success: true, message: "Service added successfully" });
      }
    }
  } catch (err) {
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
}

export const deleteService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(301).json({ success: false, message: "Invalid payload" });
    }
    let { name } = req.body;
    let { garageId } = req.params;

    let result = await findService(name);
    if (result.length != 1) throw "Something went wrong!";

    let garageResult = await deleteGarageService([garageId, result[0].id]);
    if (!garageResult) throw "Something went wrong!";

    return res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    return res.status(301).json({ success: false, message: err.message });
  }
}

export const servicesListing = async (req, res) => {
  try {
    const servicesList = await serviceListing();
    res.status(201).json({ success: false, servicesList });
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

export const allServices = async (req, res) => {
  try {
    const services = await getServices();
    res.status(201).json({ success: true, services });
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

export const getServiceCount = async (req, res) => {
  try {
    const serviceCount = await countServices(req.user.id);
    res.status(201).json({ success: true, serviceCount });
  } catch (error) {
    console.log(error)
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

export const findOwnerService = async (req, res) => {
  try {
    const { garageId } = req.body;
    const services = await getOwnerService(req.user.id, garageId);
    res.status(201).json({ success: true, services });
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};