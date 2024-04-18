import { customerSlotListing, getCustomerNames, ifFeedbackExist, insertFeedback } from "../utils/dbHandler.js"

export const home = async (req, res) => {
    res.render("customer", { title: "Home", active: "dashboard" });
};

export const vehicles = async (req, res) => {
    res.render("customer", { active: "vehicle" });
}

export const addVehicles = async (req, res) => {
    res.render("customer", { active: "addVehicle" });
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

export const CustomerFeedback = async (req, res) => {
    res.render("customerFeedback.ejs")
}

export const CustomerFeedbackPost = async (req, res) => {
    let { customerId, garageId, rating, message } = req.body
    var customerFeedback = await ifFeedbackExist(customerId)
    if (customerFeedback.length > 0) {
        return res.status(208).send({ message: "alredy Exist" });
    } else {
        const result = await insertFeedback(garageId, customerId, message, rating)
        return res.status(201).send({ message: "user feedback accepted" })
    }


}
