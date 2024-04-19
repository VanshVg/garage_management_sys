import { customerSlotListing, getCustomerAppointments, getCustomerNames, ifFeedbackExist, insertFeedback, selectByFieldName } from "../utils/dbHandler.js"

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
    return res.status(208).send({ message: "already Exist" });
  } else {
    const result = await insertFeedback(garageId, customerId, message, rating)
    return res.status(201).send({ message: "user feedback accepted" })
  }
}

export const showAppointments = async (req,res) => {
  try {
    const { email } = req.user;
    const user = await selectByFieldName("users", "email", email);
    if (user.length < 1) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    let appointments = await getCustomerAppointments(user[0].id);
    return res.render("partials/customerAppointments", {appointments});
  } catch (error) {
    console.log(error);
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
}