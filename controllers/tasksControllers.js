import {
  findVehicleStatus,
  selectByFieldName,
  updateFields,
} from "../utils/dbHandler.js";

export const getVehicleStatus = async (req, res) => {
  try {
    const { garageId } = req.params;
    let result = await findVehicleStatus(garageId);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};

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
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};
