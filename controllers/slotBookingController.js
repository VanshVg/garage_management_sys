import { validationResult } from "express-validator";
import { deleteSlot, getAllSlots, getAppointsByDateRange, insertSlot, updateSlot,bookSlotService,findOne } from "../utils/dbHandler.js";


export const slotBooking = async (req, res) => {
    try {
        const { garageId, startTime, endTime } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(301).json({ success: false, message: "Invalid payload" });
        }
        else {
            const result = await insertSlot([garageId, startTime, endTime]);
            if (!result) {
                res.status(301).json({ success: false, message: "something went wrong" });
            }
            else if (result.error) {
                res.status(301).json({ success: false, message: "error adding slot please try again" });
            }
            else res.status(201).json({ success: true, message: "slot inserted successfully" });
        }
    } catch (error) {
        res.status(401).json({ success: false, message: "Something went wrong please try again" });
    }
}

export const slotUpdate = async (req, res) => {
    try {
        const { startTime, endTime, slotId } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(301).json({ success: false, message: "Invalid payload" });
        } else {
            const result = await updateSlot([startTime, endTime, slotId]);
            if (!result || result.error) {
                res.status(301).json({ success: false, message: "something went wrong please try again" });
            }
            else {
                res.status(201).json({ success: false, message: "slot updated successfully" })
            }
        }
    } catch (error) {
        res.status(401).json({ success: false, message: "Something went wrong" });
    }
}

export const slotDelete = async (req, res) => {
    try {
        const { slotId } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(301).json({ success: false, message: "Invalid payload" });
        }
        const result = await deleteSlot([slotId]);
        if (!result || result.error) {
            res.status(301).json({ success: false, message: "something went wrong please try again" });
        }
        else {
            res.status(201).json({ message: "slot was deleted successfully" })
        }
    } catch (error) {
        res.status(401).json({ success: false, message: "something went wrong please try again" });
    }
}

export const getSlots = async (req, res) => {
    try {
        const { startIndex, endIndex } = req.pagination;
        const garage = req.query.garage;
        const userId = req.user.id;
        const result = await getAllSlots(startIndex, garage, userId);
        const totalPage = Math.ceil(result[1][0].count / 10);
        res.status(201).json({ success: true, result: result[0], count: result[1][0].count, startIndex: startIndex, endIndex: endIndex, totalPage: totalPage });
    } catch (error) {
        res.status(401).json({ success: false, message: "something went wrong please try again" });
    }
}

export const appointmentsByDateRange = async (req, res) => {
    try {
        const { garageId, startDate, endDate } = req.body;
        const result = await getAppointsByDateRange([startDate, endDate, garageId]);
        res.status(201).json({ success: true, appointments: result });
    } catch (error) {
        res.status(401).json({ success: false, message: "something went wrong please try again" });
    }
    const { garageId, startDate, endDate } = req.body;
    const result = await getAppointsByDateRange([startDate, endDate, garageId]);
    res.status(201).json({ success: true, appointments: result });
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