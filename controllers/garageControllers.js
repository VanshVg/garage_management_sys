import { validationResult } from 'express-validator';
import { insertGarage, insertGarageAddress, insertGarageOwner, updateGarage, deleteGarage } from "../utils/dbHandler.js";
import { fileUpload } from '../helpers/fileUploads.js';
// garage add 
export const garageAdd = async (req, res) => {
  let { garageName, contactNumber, email, openTime, closeTime, description, area, pincode } = req.body;
  let cityId = 1;
  let residentId = 1;
  let userId = 1;
  let thumbnail = fileUpload();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({ success: false, errors: errors.array() });
  }
  else {
    let result = await insertGarageAddress([residentId, cityId, area, pincode]);
    if (!result.error) {
      let garageId = await insertGarage([garageName, contactNumber, email, thumbnail, openTime, closeTime, description, result]);
      if (!garageId.error) {
        result = await insertGarageOwner([garageId, userId]);
        if (!result.error) {
          res.status(200).json({ success: true, message: "garage registered successfully." })
        }
      } else {
        res.status(500).json({ success: false, message: "Something went wrong!" });
      }
    } else {
      res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  }
}
// garage update
export const garageUpdate = async (req, res) => {
  const { garageName } = req.body;
  let result = await updateGarage();
  if (!garageName) {
    res.status(500).json({ success: false, message: "Please provide garage name" })
  } else {
    res.status(200).json({ success: true, message: "Garage Registered" })
  }
}
// garage delete
export const garageDelete = async (req, res) => {
  const { garageName } = req.body;
  let result = await deleteGarage();
  if (!garageName) {
    res.status(500).json({ success: false, message: "Please provide garage name" })
  } else {
    res.status(200).json({ success: true, message: "Garage Registered" })
  }

}
