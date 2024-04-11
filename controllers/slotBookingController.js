import { validationResult } from "express-validator";
import { deleteSlot, insertSlot, updateSlot } from "../utils/dbHandler.js";


export const slotBooking = async (req,res) =>{
    const {garageId,startTime, endTime } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(301).json({ success: false, errors: errors.array() });
    }
    else{
        const result = await insertSlot([garageId,startTime,endTime])
        console.log(result);
        if (result) {
            res.status(201).json({message: "slot inserted successfully"})
        } else {
            res.status(301).json({success: false, message: "slot was not booked"})
        }
    }
}

export const slotUpdate = async (req,res) =>{
    const {startTime,endTime,slotId} = req.body
    console.log(startTime);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(301).json({success: false,errors:errors.array()});
    } else {
        const result = await updateSlot([startTime,endTime,slotId])
        console.log(result);
        if (result) {
            res.status(201).json({message: "slot updated successfully"})
        } else {
            res.status(301).json({message: "slot was not updated"})
        }
    }
}

export const slotDelete = async (req,res) =>{
    const {slotId} = req.body
    const errors = validationResult(req)
    const result = await deleteSlot([slotId])
    console.log(result);
    if (result) {
        res.status(201).json({message: "slot was deleted successfully"})
    } else {
        res.status(301).json({message: "slot was not deleted"})
    }
}