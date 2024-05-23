import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  insertGarage,
  insertGarageAddress,
  insertGarageOwner,
  insertGarageReference,
  updateGarage,
  updateGarageAddress,
  displayGarage,
  getOwnerGarages,
  garageSlotListing,
  getNearByGarage,
  getSingleGarageService,
  getGarageAppointments,
  getGarageDuration,
  updateFields,
  garagesCount,
  countgarages,
  getGarageAddress,
} from "../utils/dbHandler";

import { dateTimeConvertor } from "../helpers/dateTimeConvertor";
import { findOne } from "../utils/common";
import { logger } from "../helpers/logger";
import {
  RequestWithPagination,
  garageDurationInterface,
  garageSlotListingInterface,
  getGarageAppointmentsInterface,
  paginationInterface,
  userInterface,
} from "../interfaces/interface";
import { ResultSetHeader } from "mysql2";

// display garage form with data
export const garageDisplay = async (req: Request, res: Response) => {
  try {
    let garageId = 1;
    let data = await displayGarage(garageId);
    res.render("garage/garageModule", { title: "Garage Form", data });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// add new garage
export const garageAdd = async (req: Request, res: Response) => {
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
    let thumbnail = (req.file as { filename: string }).filename;
    userId = (req.user as userInterface).id || userId;
    openTime = dateTimeConvertor(openTime);
    closeTime = dateTimeConvertor(closeTime);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
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
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// update garage if exists
export const garageUpdate = async (req: Request, res: Response) => {
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
        } else throw "Something went wrong";
      } else throw "Something went wrong";
    }
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// delete garage if exists
export const garageDelete = async (req: Request, res: Response) => {
  try {
    const { garageId } = req.params;
    let garageResult: ResultSetHeader = (await updateFields(
      "garage_master",
      { is_deleted: 1 },
      { id: garageId }
    )) as ResultSetHeader;

    let garageAddressResult: ResultSetHeader = (await updateFields(
      "garage_address",
      { is_deleted: 1 },
      { garage_id: garageId }
    )) as ResultSetHeader;

    (await updateFields(
      "garage_events",
      { is_deleted: 1 },
      { garage_id: garageId }
    )) as ResultSetHeader;

    let garageServiceResult: ResultSetHeader = (await updateFields(
      "garage_has_services",
      { is_deleted: 1 },
      { garage_id: garageId }
    )) as ResultSetHeader;

    if (
      !garageResult.affectedRows ||
      !garageAddressResult ||
      !garageServiceResult
    ) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }

    return res.status(200).json({ success: true, message: "garage deleted" });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

// get all garages of an owner
export const getGarageListing = async (req: Request, res: Response) => {
  try {
    const user = req.user as userInterface;
    const result = await getOwnerGarages(user.id);
    res.json({ garages: result });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error });
  }
};

// get all slots of a garage
export const getGarageSlots = async (req: Request, res: Response) => {
  try {
    let { garageId } = req.body;
    let [garageDuration]: Array<garageDurationInterface> =
      (await getGarageDuration(garageId)) as Array<garageDurationInterface>;
    const result: Array<garageDurationInterface> = (await garageSlotListing(
      garageId,
      garageDuration.open_time as string,
      garageDuration.close_time as string
    )) as Array<garageDurationInterface>;
    result.push(garageDuration);
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// get garages details of an owner
export const getGarages = async (req: Request, res: Response) => {
  try {
    let distance = req.params.dist || 10;
    let lat = req.params.lat;
    let long = req.params.long;
    const result = await getNearByGarage(distance, lat, long);
    res.json({ result });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error });
  }
};

// get details of a specific garage with id
export const getSingleGarage = async (req: Request, res: Response) => {
  try {
    let garageId = req.params.id;
    const result = await getSingleGarageService(garageId);
    res.json({ result });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error });
  }
};

// get number of garages owned by a user
export const getGarageCount = async (req: Request, res: Response) => {
  try {
    const garageCount = await countgarages((req.user as userInterface).id);
    res.status(201).json({ success: true, garageCount });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// get all appointments of a garage
export const showGarageAppointments = async (
  req: RequestWithPagination,
  res: Response
) => {
  try {
    const { startIndex, endIndex, limit } =
      req.pagination as paginationInterface;
    const { garageId } = req.params;
    let appointments: Array<Array<getGarageAppointmentsInterface>> =
      (await getGarageAppointments(garageId, startIndex)) as Array<
        Array<getGarageAppointmentsInterface>
      >;
    // console.log(appointments);
    return res.status(200).json({
      success: true,
      appointments: appointments[0],
      pagination: {
        totalRecords: appointments[1][0].count,
        startIndex,
        endIndex,
        totalPages: Math.ceil(appointments[1][0].count / limit),
      },
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};

// get number of garages registered on the platform
export const garageCount = async (req: Request, res: Response) => {
  try {
    let result: Array<{ count: number }> = (await garagesCount()) as Array<{
      count: number;
    }>;
    let count = result[0].count;
    if (count > 1000) count = 1000;
    else if (count > 100) count = 100;
    else if (count > 10) count = 10;
    res.status(201).json({ success: true, count });
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// get address of garage
export const garageAddress = async (req: Request, res: Response) => {
  try {
    const result = await getGarageAddress([req.params.garageId]);
    res.status(201).json({ address: result });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
