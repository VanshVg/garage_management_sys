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
    // let garageId = 1;
    // let startDate = '2020-01-01';
    // let endDate = '2020-01-02';
    let { garageId, startDate, endDate } = req.body;
    const result = await customerSlotListing(garageId, startDate, endDate);

    res.json(result);
}
