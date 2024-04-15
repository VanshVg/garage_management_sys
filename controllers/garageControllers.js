import { validationResult } from 'express-validator';
import { insertGarage, insertGarageAddress, insertGarageOwner, insertGarageReference, updateGarage, updateGarageAddress, deleteGarage, displayGarage, getGarageList } from "../utils/dbHandler.js";
import { fileUpload } from '../helpers/fileUploads.js';

// display garage form with data
export const garageDisplay = async (req, res) => {
  let garageId = 1;
  let data = await displayGarage(garageId);
  res.render('garage/garageModule', { title: "Garage Form", data });
}
// garage add 
export const garageAdd = async (req, res) => {
  let { garageName, contactNumber, email, openTime, closeTime, cityId, description, area, pincode } = req.body;
  let userId = 1;
  let thumbnail = fileUpload();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({ success: false, errors: errors.array() });
  } else {
    let addressId = await insertGarageAddress([cityId, area, pincode]);
    if (addressId) {
      let garageId = await insertGarage([garageName, contactNumber, email, thumbnail, openTime, closeTime, description]);
      if (garageId) {
        let result = await insertGarageOwner([userId, garageId]);
        let result2 = await insertGarageReference([addressId, garageId]);
        if (result && result2) {
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
    if (result) {
      result = await updateGarageAddress([cityId, area, pincode, addressId]);
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
  if (result) {
    res.status(200).json({ success: true, message: "garage deleted" });
  } else {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }

}

//getting garage Details

export const garageList = (req, res) => {
  res.render('garage/garageList.ejs')
}

export const getGarageListing = async (req, res) => {
  const result = await getGarageList();
  res.json({ result: result })
}