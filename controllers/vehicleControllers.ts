import { validationResult } from "express-validator";
import { Request, Response } from "express";
import {
  fetchUserVehicle,
  findAllUserVehicles,
  findVehicleData,
  getVehicleType,
  insertData,
  selectByFieldName,
  selectByFieldNames,
  updateVehicleDetails,
} from "../utils/dbHandler";
import { logger } from "../helpers/logger";
import {
  userInterface,
  userVehiclesInterface,
  vehicleInterface,
} from "../interfaces/interface";
import { ResultSetHeader } from "mysql2";

interface errorWithResult extends ResultSetHeader {
  error: string;
}

// add new vehicle for customer
export const addVehicle = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(301)
        .json({ success: false, message: "Invalid payload" });
    }
    const { type, brand, model, year, numberPlate, description } = req.body;
    let vehicleImage = req.file?.filename || "";
    let user: Array<userInterface> = (await selectByFieldName(
      "users",
      "email",
      (req.user as userInterface).email
    )) as Array<userInterface>;
    if (user.length < 1) {
      return res
        .status(301)
        .json({ success: false, message: "something went wrong" });
    }

    let isUserVehicle: Array<userVehiclesInterface> = (await selectByFieldNames(
      "user_has_vehicles",
      {
        owner_id: user[0].id,
        register_plate_number: numberPlate,
      }
    )) as Array<userVehiclesInterface>;
    if (isUserVehicle.length > 0) {
      return res
        .status(301)
        .json({ success: false, message: "This Vehicle is already added" });
    }

    let vehicleId;
    let isVehicle: Array<vehicleInterface> = (await selectByFieldNames(
      "vehicle_master",
      {
        brand: brand,
        model: model,
        year: year,
      }
    )) as Array<vehicleInterface>;
    if (isVehicle.length < 1) {
      let vehicleResult: ResultSetHeader = (await insertData(
        "vehicle_master",
        ["type_id", "brand", "model", "year"],
        [type, brand, model, year]
      )) as ResultSetHeader;
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

    let userVehicle: ResultSetHeader = (await insertData(
      "user_has_vehicles",
      ["owner_id", "vehicle_id", "register_plate_number"],
      [user[0].id, vehicleId, numberPlate]
    )) as ResultSetHeader;
    if (!userVehicle.insertId) {
      return res
        .status(301)
        .json({ success: false, message: "something went wrong" });
    }

    let vehicleCondition: ResultSetHeader = (await insertData(
      "vehicle_condition",
      ["condition_image", "description", "vehicle_id"],
      [vehicleImage, description, userVehicle.insertId]
    )) as ResultSetHeader;
    if (!vehicleCondition.insertId) {
      return res
        .status(301)
        .json({ success: false, message: "something went wrong" });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle added successfully",
      vehicleId: userVehicle.insertId,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }
};

// get types of vehicles available
export const getVehicleTypes = async (req: Request, res: Response) => {
  try {
    let types = await getVehicleType();
    res.status(200).json({ success: true, result: types });
  } catch (error) {
    logger.error(error);
    res.status(503).json({ success: false, message: "Something went wrong!" });
  }
};

// get vehicles of customer by vehicle type
export const getUserVehicle = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    let vehicleData = await findVehicleData(
      (req.user as userInterface).email,
      type
    );
    return res.json({ success: true, result: vehicleData });
  } catch (error) {
    logger.error(error);
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }
};

// get all vehicles of customer
export const getAllUserVehicles = async (req: Request, res: Response) => {
  try {
    const { email } = req.user as userInterface;
    let vehicles = await findAllUserVehicles(email);
    return res.json({ success: true, result: vehicles });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};

// get details of customer vehicle
export const getUserVehicleDetails = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.id;
    let vehicleDetails = await fetchUserVehicle(vehicleId);
    return res.json({ success: true, result: vehicleDetails });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something Went Wrong!" });
  }
};

// update customer vehicle
export const updateUserVehicle = async (req: Request, res: Response) => {
  try {
    const { brand, model, year, numberPlate, description, thumbnail, id } =
      req.body;
    let result: errorWithResult = (await updateVehicleDetails([
      numberPlate,
      brand,
      model,
      year,
      description,
      thumbnail,
      id,
    ])) as errorWithResult;
    if (result.error) {
      res
        .status(400)
        .json({ success: false, message: "Something Went Wrong!" });
    } else {
      res.status(200).json({ success: true, message: "Vehicle Updated" });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Something Went Wrong!" });
  }
};
