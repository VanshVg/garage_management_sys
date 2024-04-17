import { validationResult } from "express-validator";
import { findVehicleData, insertData, selectByFieldName, selectByFieldNames } from "../utils/dbHandler.js";

export const addVehicle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(301).json({ success: false, message: "Invalid payload" });
    }
    const { type, vehicleImage, brand, model, year, numberPlate, description } = req.body;

    let typeResult = await selectByFieldName("vehicle_types", "name", type);
    let typeId = typeResult[0].id;

    let user = await selectByFieldName("users", "email", req.user.email);
    if (user.length < 1) {
      return res.status(301).json({ success: false, message: "something went wrong" });
    }

    let isUserVehicle = await selectByFieldNames("user_has_vehicles", {
      owner_id: user[0].id,
      register_plate_number: numberPlate,
    });
    if (isUserVehicle.length > 0) {
      return res.status(301).json({ success: false, message: "This Vehicle is already added" });
    }

    let vehicleId;
    let isVehicle = await selectByFieldNames("vehicle_master", {
      brand: brand,
      model: model,
      year: year,
    });
    if (isVehicle.length < 1) {
      let vehicleResult = await insertData(
        "vehicle_master",
        ["type_id", "brand", "model", "year"],
        [typeId, brand, model, year]
      );
      if (!vehicleResult.insertId) {
        return res.status(301).json({ success: false, message: "something went wrong" });
      }
      vehicleId = vehicleResult.insertId;
    }
    if (vehicleId == undefined) {
      vehicleId = isVehicle[0].id;
    }


    let userVehicle = await insertData(
      "user_has_vehicles",
      ["owner_id", "vehicle_id", "register_plate_number"],
      [user[0].id, vehicleId, numberPlate]
    );
    if (!userVehicle.insertId) {
      return res.status(301).json({ success: false, message: "something went wrong" });
    }

    let vehicleCondition = await insertData(
      "vehicle_condition",
      ["condition_image", "description", "vehicle_id"],
      [vehicleImage, description, userVehicle.insertId]
    );
    if (!vehicleCondition.insertId) {
      return res.status(301).json({ success: false, message: "something went wrong" });
    }

    return res.status(200).json({ success: true, message: "Vehicle added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
};


export const getAddVehicle = async (req, res) => {
  try {
    let user = await selectByFieldName("users", "email", req.user.email);
    if (user.length < 1) {
      return res.status(301).json({ success: false, message: "something went wrong" });
    }

    let vehicleData = await findVehicleData(user[0].id)
    return res.render("partials/addVehicle.ejs", { vehicleData })
  } catch (error) {
    console.log(error);
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
}