import { validationResult } from "express-validator";
import { deleteSlot, getAllSlots, getAppointsByDateRange, insertSlot, updateSlot,bookSlotService,findOne } from "../utils/dbHandler.js";


export const slotBooking = async (req, res) => {
  const { garageId, startTime, endTime } = req.body;
  console.log(garageId);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(301).json({ success: false, errors: errors.array() });
  } else {
    const result = await insertSlot([garageId, startTime, endTime, 1]);
    console.log(result);
    if (!result)
      res.status(301).json({ success: false, message: "something went wrong" });
    else if (result.error) {
      res.status(301).json({
        success: false,
        message: "error adding slot please try again",
      });
    } else res.status(201).json({ message: "slot inserted successfully" });
  }
};

export const slotUpdate = async (req, res) => {
  const { startTime, endTime, slotId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(301).json({ success: false, errors: errors.array() });
  } else {
    const result = await updateSlot([startTime, endTime, slotId]);
    if (result) {
      res.status(201).json({ message: "slot updated successfully" });
    } else {
      res.status(301).json({ message: "slot was not updated" });
    }
  }
};

export const slotDelete = async (req, res) => {
  const { slotId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(301).json({ success: false, message: "Invalid payload" });
  }
  const result = await deleteSlot([slotId]);
  if (result) {
    res.status(201).json({ message: "slot was deleted successfully" });
  } else {
    res.status(301).json({ message: "slot was not deleted" });
  }
};

export const getSlots = async (req, res) => {
  try {
    const { startIndex, endIndex } = req.pagination;
    const garage = req.query.garage;
    const user = req.user.email;

    const userExist = req.user;

    const result = await getAllSlots(startIndex, garage, userExist.id);
    const totalPage = Math.ceil(result[1][0].count / 10);

    res.json({
      result: result[0],
      count: result[1][0].count,
      startIndex: startIndex,
      endIndex: endIndex,
      totalPage: totalPage,
    });
  } catch (error) {
    console.error("Error in getSlots:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const appointmentsByDateRange = async (req, res) => {
  try {
    const { garageId, startDate, endDate } = req.body;
    const result = await getAppointsByDateRange([startDate, endDate, garageId]);
    res.status(201).json({ success: true, appointments: result });
  }catch(err){
    res.status(500).json({success:false, message: "Internal server error"});
  }
}

export const bookSlot = async (req,res) => {
    const user = req.user.email
    const slotId = req.body.slotId;

    const userExist = await findOne(user);
    const [result] = await bookSlotService(userExist[0].id,slotId);

    if(result){
        res.status(200).json({ success: true, message:"Slot Added Successfully"});
    }else{
        res.status(404).json({ success: false, message:"Slot is not added"});
    }

}
