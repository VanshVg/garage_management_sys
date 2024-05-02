import { logger } from "../helpers/logger.js";
import {
  findVehicleStatus,
  selectByFieldName,
  updateFields,
} from "../utils/dbHandler.js";

// get current status of vehicle
export const getVehicleStatus = async (req, res) => {
  try {
    const { page, startIndex, endIndex, limit } = req.pagination;
    const { garageId } = req.params;
    let result = await findVehicleStatus(garageId, startIndex);
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
export const changeVehicleStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    let appointment = await selectByFieldName(
      "appointments",
      "id",
      appointmentId
    );
    if (appointment.length < 1) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }

    let updateResult = await updateFields(
      "appointments",
      { vehicle_status: status, status: 2 },
      { id: appointmentId }
    );
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
