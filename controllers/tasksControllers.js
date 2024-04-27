import { findVehicleStatus } from "../utils/dbHandler.js";

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
