import { validationResult } from "express-validator";
import {
  findVehicleData,
  getVehicleType,
  insertData,
  selectByFieldName,
  selectByFieldNames,
} from "../utils/dbHandler.js";

export const addVehicle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(301)
        .json({ success: false, message: "Invalid payload" });
    }
    const {
      vehicle,
      vehicleImage,
      brand,
      model,
      year,
      numberPlate,
      description,
    } = req.body;
    // console.log(req.body.vehicle);

    let [vId] = await selectByFieldName("vehicle_types", "name", vehicle);

    let user = await selectByFieldName("users", "email", req.user.email);
    if (user.length < 1) {
      return res
        .status(301)
        .json({ success: false, message: "something went wrong" });
    }

    let isUserVehicle = await selectByFieldNames("user_has_vehicles", {
      owner_id: user[0].id,
      register_plate_number: numberPlate,
    });
    if (isUserVehicle.length > 0) {
      return res
        .status(301)
        .json({ success: false, message: "This Vehicle is already added" });
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
        [vId.id, brand, model, year]
      );
      if (!vehicleResult.insertId) {
        return res
          .status(301)
          .json({ success: false, message: "something went wrong" });
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
      return res
        .status(301)
        .json({ success: false, message: "something went wrong" });
    }

    let vehicleCondition = await insertData(
      "vehicle_condition",
      ["condition_image", "description", "vehicle_id"],
      [vehicleImage, description, userVehicle.insertId]
    );
    if (!vehicleCondition.insertId) {
      return res
        .status(301)
        .json({ success: false, message: "something went wrong" });
    }

    return res.render("customer", { active: "addVehicle" });
  } catch (error) {
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }
};
export const getVehicleTypes = async (req, res) => {
  try {
    let types = await getVehicleType();
    res.status(200).json({ success: true, types });
  } catch (error) {
    res.status(503).json({ success: false, message: "Something went wrong!" });
  }
};

export const getUserVehicle = async (req, res) => {
  try {
    const { type } = req.params;

    let user = await selectByFieldName("users", "email", req.user.email);
    if (user.length < 1) {
    }

    let vehicleData = await findVehicleData(req.user.email, type);

    return res.json({ result: vehicleData });
  } catch (error) {
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }
};
