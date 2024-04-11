import { validationResult } from 'express-validator';
import { insertGarage, insertGarageAddress, insertGarageOwner, insertGarageReference, updateGarage, updateGarageAddress, deleteGarage } from "../utils/dbHandler.js";
import { fileUpload } from '../helpers/fileUploads.js';
// garage add 
export const garageAdd = async (req, res) => {
  let { garageName, contactNumber, email, openTime, closeTime, cityId, description, area, pincode } = req.body;
  let userId = 1;
  let thumbnail = fileUpload();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({ success: false, errors: errors.array() });
  }
  else {
    let addressId = await insertGarageAddress([cityId, area, pincode]);
    console.log(addressId);
    if (addressId) {
      let garageId = await insertGarage([garageName, contactNumber, email, thumbnail, openTime, closeTime, description]);
      console.log(garageId);
      if (garageId) {
        let result = await insertGarageOwner([userId, garageId]);
        let result2 = await insertGarageReference([addressId, garageId]);
        if (result && result2) {
          // console.log(result);
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
  let { garageName, contactNumber, email, openTime, closeTime, cityId, description, area, pincode } = req.body;
  let garageId = 1;
  let addressId = 2;
  let thumbnail = fileUpload();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({ success: false, errors: errors.array() });
  } else {
    let result = await updateGarage([garageName, contactNumber, email, thumbnail, openTime, closeTime, description, garageId]);
    console.log(result);
    if (result) {
      result = await updateGarageAddress([cityId, area, pincode, addressId]);
      console.log(result);
      if (result) {
        res.status(200).json({ success: true, message: "garage updated" });
      } else {
        res.status(500).json({ success: false, message: "Something went wrong" });
      }
    } else {
      res.status(500).json({ success: false, message: "Something went wrong" });
    }

  }
}

// garage delete
export const garageDelete = async (req, res) => {
  let garageId = 1;
  let addressId = 2;
  let referenceId = 1;
  let result = await deleteGarage(garageId, addressId, referenceId);
  console.log(result);
  if (result) {
    res.status(200).json({ success: true, message: "garage deleted" });
  } else {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }

}
