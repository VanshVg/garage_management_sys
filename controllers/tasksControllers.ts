import { ResultSetHeader } from "mysql2";
import { logger } from "../helpers/logger";
import {
  RequestWithPagination,
  appointmentsInterface,
  findVehicleStatusInterface,
  paginationInterface,
} from "../interfaces/interface";
import {
  findVehicleStatus,
  selectByFieldName,
  updateFields,
} from "../utils/dbHandler";
import { Request, Response } from "express";

// get current status of vehicle
export const getVehicleStatus = async (
  req: RequestWithPagination,
  res: Response
) => {
  try {
    const { page, startIndex, endIndex, limit } =
      req.pagination as paginationInterface;
    const { garageId } = req.params;
    let result: Array<Array<findVehicleStatusInterface>> =
      (await findVehicleStatus(garageId, startIndex)) as Array<
        Array<findVehicleStatusInterface>
      >;
    return res.status(200).json({
      success: true,
      result: result[0],
      pagination: {
        totalRecords: result[1][0].count,
        page,
        startIndex,
        endIndex,
        totalPages: Math.ceil(result[1][0].count / limit),
      },
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};

// change status of vehicle
export const changeVehicleStatus = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    let appointment: Array<appointmentsInterface> = (await selectByFieldName(
      "appointments",
      "id",
      appointmentId
    )) as Array<appointmentsInterface>;
    if (appointment.length < 1) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }

    let updateResult: ResultSetHeader = (await updateFields(
      "appointments",
      { vehicle_status: status, status: 2 },
      { id: appointmentId }
    )) as ResultSetHeader;
    if (!updateResult.affectedRows) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Status updated successfully!" });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};
