import { customerSlotListing, getCustomerNames } from "../utils/dbHandler.js"

export const customerVehicleSelection = (req, res) => {
    res.render("customerVehicleSelection.ejs")
}

export const getAllCustomers = async (req, res) => {
    const result = await getCustomerNames(1)
    res.json({ result: result });
}

export const slotDisplay = async (req, res) => {
    res.render("customerSlots");
}
export const customerSlotSelection = async (req, res) => {
    let { garageId, startDate, endDate } = req.body;
    const result = await customerSlotListing(garageId, startDate, endDate);
    res.json(result);
}

