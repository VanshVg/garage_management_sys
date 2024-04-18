import { customerSlotListing, getCustomerNames } from "../utils/dbHandler.js"
import {  getGarages } from "../controllers/garageControllers.js";

export const home = async (req, res) => {
    res.render("customer", { title: "Home", active: "dashboard" });
};

export const vehicles = async (req,res) => {
    res.render("customer",{active:"vehicle"});
}

export const addVehicles = async (req,res) => {
    res.render("customer", {active:"addVehicle"});
}

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

