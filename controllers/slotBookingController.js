import { validationResult } from "express-validator";
import { deleteSlot, getAllSlots, insertSlot, updateSlot } from "../utils/dbHandler.js";


export const slotBooking = async (req, res) => {
    const { garageId, startTime, endTime } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(301).json({ success: false, errors: errors.array() });
    }
    else {
        const result = await insertSlot([garageId, startTime, endTime])
        if (result) {
            res.status(201).json({ message: "slot inserted successfully" })
        } else {
            res.status(301).json({ success: false, message: "slot was not booked" })
        }
    }
}

export const slotUpdate = async (req, res) => {
    const { startTime, endTime, slotId } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(301).json({ success: false, errors: errors.array() });
    } else {
        const result = await updateSlot([startTime, endTime, slotId])
        if (result) {
            res.status(201).json({ message: "slot updated successfully" })
        } else {
            res.status(301).json({ message: "slot was not updated" })
        }
    }
}

export const slotDelete = async (req, res) => {
    const { slotId } = req.body
    const errors = validationResult(req)
    const result = await deleteSlot([slotId])
    if (result) {
        res.status(201).json({ message: "slot was deleted successfully" })
    } else {
        res.status(301).json({ message: "slot was not deleted" })
    }
}

export const getSlots = async(req,res) => {   
        const {startIndex,endIndex} =req.pagination
        const result = await getAllSlots(startIndex)
        res.json({result:result[0],count:result[1][0].count,startIndex:startIndex,endIndex:endIndex})       
}