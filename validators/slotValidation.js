import { body } from "express-validator";

export const slotValidator = [
    body("startTime").isTime({hourFormat: 'hour24'}).withMessage('time should be in 24 hours format'),
    body("endTime").isTime({hourFormat: 'hour24'}).withMessage('time should be in 24 hour format')
]