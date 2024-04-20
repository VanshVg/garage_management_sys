import { validationResult } from "express-validator";
import {
  insertGarage,
  insertGarageAddress,
  insertGarageOwner,
  insertGarageReference,
  updateGarage,
  updateGarageAddress,
  deleteGarage,
  displayGarage,
  findOne,
  getOwnerGarages,
  garageSlotListing,
  getGaragesService,
  getSingleGarageService,
  getGarageAppointments
} from "../utils/dbHandler.js";

import { dateTimeConvertor } from "../helpers/dateTimeConvertor.js";

// display garage form with data
export const garageDisplay = async (req, res) => {
  let garageId = 1;
  let data = await displayGarage(garageId);
  res.render("garage/garageModule", { title: "Garage Form", data });
};
// garage add
export const garageAdd = async (req, res) => {
  let {
    garageName,
    contactNumber,
    email,
    openTime,
    closeTime,
    cityId,
    description,
    area,
    pincode,
    userId,
    latitude,
    longitude,
  } = req.body;
  let thumbnail = req.file.filename;
  userId = (await findOne(req.user.email))[0].id || userId;
  openTime = dateTimeConvertor(openTime);
  closeTime = dateTimeConvertor(closeTime);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({ success: false, errors: errors.array() });
  } else {
    let addressId;
    try {
      addressId = await insertGarageAddress([cityId, area, pincode]);
    } catch (error) {
      res
        .status(200)
        .json({ success: false, message: "Something went wrong!" });
    }
    if (addressId) {
      let garageId = await insertGarage([
        garageName,
        contactNumber,
        email,
        thumbnail,
        openTime,
        closeTime,
        description,
      ]);
      if (garageId) {
        let result = await insertGarageOwner([userId, garageId]);
        let result2 = await insertGarageReference([
          addressId,
          garageId,
          latitude,
          longitude,
        ]);
        if (result && result2) {
          res.status(200).json({
            success: true,
            message: "garage registered successfully.",
          });
        }
      } else {
        res
          .status(500)
          .json({ success: false, message: "Something went wrong!" });
      }
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
};
// garage update
export const garageUpdate = async (req, res) => {
  let {
    garageName,
    contactNumber,
    email,
    openTime,
    closeTime,
    cityId,
    description,
    area,
    pincode,
    garageId,
  } = req.body;
  let thumbnail = req.file?.filename || "";
  openTime = dateTimeConvertor(openTime);
  closeTime = dateTimeConvertor(closeTime);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({ success: false, errors: errors.array() });
  } else {
    let result = await updateGarage([
      garageName,
      contactNumber,
      email,
      thumbnail,
      openTime,
      closeTime,
      description,
      garageId,
    ]);
    if (result) {
      result = await updateGarageAddress([
        cityId,
        area,
        pincode,
        parseInt(garageId),
      ]);
      if (result) {
        res.status(200).json({ success: true, message: "garage updated" });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Something went wrong" });
      }
    } else {
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  }
};
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
};

//getting garage Details

export const garageList = (req, res) => {
  res.render("garage/garageList.ejs");
};

export const getGarageListing = async (req, res) => {
  const user = await findOne([req.user.email]);
  const result = await getOwnerGarages([user[0].id]);
  res.json({ garages: result });
};

export const getGarageSlots = async (req, res) => {
  let { garageId, startDate, endDate } = req.body;
  const result = await garageSlotListing(garageId, startDate, endDate);
  res.json(result);
};
export const getGarages = async (req, res) => {
  const result = await getGaragesService();
  res.json({ result });
}

export const getSingleGarage = async (req,res) => {
  let garageId = req.params.id;
  const result = await getSingleGarageService(garageId);
  res.json({result});
}

export const showGarageAppointments = async (req, res) => {
  try {
    const { garageId } = req.body;
    let appointments = await getGarageAppointments(garageId);
    return res.status(200).json({ success:true, appointments})
  } catch (error) {
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
}