import { validationResult } from 'express-validator';
import { deleteFromService, deleteGarageService, findGarageService, findService, insertGarageService, insertService, updateGarageService } from '../utils/dbHandler.js';

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
        if (!garageResult) {
          return res.status(301).json({ success: false, message: "Something went wrong!" });
        }
        return res.status(200).json({ success: true, message: "Service added successfully" });
      }
    }
  } catch (err) {
    return res.status(301).json({ success: false, message: err.message });
  }
}

export const deleteService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(301).json({ success: false, errors: errors.array() });
    }
    let { name } = req.body;
    let { garageId } = req.params

    let result = await findService(name);
    if (result.length != 1) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    let garageResult = await deleteGarageService([garageId, result[0].id]);
    if (!garageResult) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }
    return res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    return res.status(301).json({ success: false, message: err.message });
  }
}