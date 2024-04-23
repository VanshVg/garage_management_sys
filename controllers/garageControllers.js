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
  getOwnerGarages,
  garageSlotListing,
  getGaragesService,
  getSingleGarageService,
  countByFieldName,
  getGarageAppointments,
  getGarageDuration,

} from "../utils/dbHandler.js";
import { dateTimeConvertor } from "../helpers/dateTimeConvertor.js";

// display garage form with data
export const garageDisplay = async (req, res) => {
  try {
    let garageId = 1;
    let data = await displayGarage(garageId);
    res.render("garage/garageModule", { title: "Garage Form", data });
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};
// garage add
export const garageAdd = async (req, res) => {
  try {
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
    userId = req.user.id || userId;
    openTime = dateTimeConvertor(openTime);
    closeTime = dateTimeConvertor(closeTime);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ success: false, message: "Something went wrong!" });
    } else {
      let addressId = await insertGarageAddress([cityId, area, pincode]);
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
        } else throw "Something went wrong!";
      } else throw "Something went wrong!";
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};
// garage update
export const garageUpdate = async (req, res) => {
  try {
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
      res.status(500).json({ success: false, message: "Invalid payload" });
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
        }
        else throw "Something went wrong";
      }
      else throw "Something went wrong";
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};
// garage delete
export const garageDelete = async (req, res) => {
  try {
    let garageId = 1;
    let addressId = 2;
    let referenceId = 1;
    let result = await deleteGarage(garageId, addressId, referenceId);
    if (result) {
      res.status(200).json({ success: true, message: "garage deleted" });
    }
    else throw "Something went wrong!";
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

export const getGarageListing = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await getOwnerGarages([userId]);
    res.status(201).json({ success: false, garages: result });
  } catch (error) {
    res.status(401).jsoN({ success: false, message: "Something went wrong!" });
  }
};

export const getGarageSlots = async (req, res) => {
  try {
    let { garageId } = req.body;
    let garageDuration = await getGarageDuration(garageId);
    console.log(garageDuration)
    const result = await garageSlotListing(garageId);
    result.push(garageDuration);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGarages = async (req, res) => {
  try {
    const result = await getGaragesService();
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleGarage = async (req, res) => {
  try {
    let garageId = req.params.id;
    const result = await getSingleGarageService(garageId);
    res.status(201).json({ success: false, result });
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

export const getGarageCount = async (req, res) => {
  try {
    const garageCount = await countByFieldName(
      "owner_has_garages",
      "owner_id",
      req.user.id
    );
    res.status(201).json({ success: true, garageCount });
  } catch (error) {
    console.log(error)
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};
export const showGarageAppointments = async (req, res) => {
  try {
    const { garageId } = req.body;
    let appointments = await getGarageAppointments(garageId);
    return res.status(200).json({ success: true, appointments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
}
