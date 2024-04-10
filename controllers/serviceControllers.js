import { validationResult } from 'express-validator';
import { insertService } from '../utils/dbHandler.js';

export const addService = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(301).json({ success: false, errors: errors.array() });
  }
  let {name, description, price} = req.body;

  let result = await insertService([name, description, price]);
  console.log(result);
} 