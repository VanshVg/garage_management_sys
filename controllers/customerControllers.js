import {
  customerSlotListing,
  getCustomerAppointments,
  getCustomerNames,
  ifFeedbackExist,
  insertFeedback,
} from "../utils/dbHandler.js";

export const getAllCustomers = async (req, res) => {
  try {
    const result = await getCustomerNames(1);
    res.status(201).json({ success: true, result: result });
  } catch (error) {
    res.status(401).json({ success: false, message: "something went wrong!" });
  }
};

export const customerSlotSelection = async (req, res) => {
  try {
    let { garageId, date } = req.body;
    const result = await customerSlotListing(garageId, date);
    res.status(201).json({ result });
  } catch (error) {
    res.status(401).json({ success: false, message: "something went wrong" });
  }
};

export const CustomerFeedback = async (req, res) => {
  res.render("customerFeedback.ejs")
}
  
export const CustomerFeedbackPost = async (req, res) => {
  try {
    let { customerId, garageId, rating, message } = req.body;
    var customerFeedback = await ifFeedbackExist(customerId);
    if (customerFeedback.length > 0) {
      return res.status(301).json({ success: false, message: "already Exist" });
    } else {
      const result = await insertFeedback(
        garageId,
        customerId,
        message,
        rating
      );
      if (!result || result.error) {
        res
          .status(301)
          .json({ success: false, message: "Something went wrong!" });
      } else {
        res
          .status(201)
          .send({ success: true, message: "user feedback accepted" });
      }
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

export const showAppointments = async (req, res) => {
  try {
    let appointments = await getCustomerAppointments(req.user.id);
    res.render("partials/customerAppointments", { appointments });
  } catch (error) {
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }
};
