import { validationResult } from 'express-validator';
import { findService, insertGarageService, insertService } from '../utils/dbHandler.js';

export const addService = async(req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(301).json({ success: false, errors: errors.array() });
    }
    let {name} = req.body;
    let { garageId } = req.params
  
    let result = await findService(name);
    if (result.length!=1) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }
    let garageResult = await insertGarageService([garageId, result[0].id]);
    if(!garageResult) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }
    return res.status(201).json({ success: true, message: "Service added successfully" }); 
  } catch (err) {
    return res.status(301).json({ success: false, message: err.message });
  }
} 