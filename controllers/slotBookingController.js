import { validationResult } from "express-validator";

export const slotBooking = (req,res) =>{
    const {startTime, endTime } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(301).json({ success: false, errors: errors.array() });
    }
    else{
        try {
            
        } catch (error) {
            
        }
    }
}