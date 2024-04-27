import {
  countAppointments,
  getCustomerNames,
  getGarageAddress,
  getNotAvailableService,
  getUsersNotifications,
  serviceListing,
} from "../utils/dbHandler.js";
import { findOne } from "../utils/common.js";
import { logger } from "../helpers/loger.js";

import { getInstance } from "../utils/socket.js";

const io = getInstance();

// landing page
export const landingPage = (req, res) => {
  res.render("landingPage", { title: "Garage Management System" });
};

export const dashboard = async (req, res) => {
  let userId = req.user.id;

  const notification = await getNotifications(userId);

  const io = getInstance();

  io.on("connection", async (socket) => {
    socket.emit("notification", notification);
  });

  res.render("index", { title: "Home", active: "dashboard" });
};

export const home = async (req, res) => {
  res.render("customer", { title: "Home", active: "dashboard" });
};

export const userProfile = async (req, res) => {
  res.render("index", { title: "Profile", active: "profile" });
};

export const garageListing = (req, res) => {
  res.render("index", { title: "Garages", active: "garages" });
};

export const services = (req, res) => {
  res.render("index", { title: "Services", active: "services" });
};

export const slots = (req, res) => {
  res.render("index", { title: "Slots", active: "slots" });
};

export const customer = (req, res) => {
  res.render("index", { title: "customer", active: "customer" });
};

export const appointments = (req, res) => {
  res.render("index", { title: "Appointments", active: "appointment" });
};
export const inventory = (req, res) => {
  res.render("index", { title: "Inventory", active: "inventory" });
};

export const tasks = (req, res) => {
  res.render("index", { title: "Tasks", active: "tasks" });
};

export const employee = (req, res) => {
  res.render("index", { title: "Employees", active: "employee" });
};
export const invoice = (req, res) => {
  res.render("index", { title: "Invoice", active: "invoice" });
};

export const customerProfile = (req, res) => {
  res.render("partials/customerProfile", { title: "profile" });
};

export const notFound = (req, res) => {
  res.render("404", { title: "404 Not Found!" });
};
// garage form display
export const garageForm = (req, res) => {
  let data = [{}];
  res.render("garage/garageModule", { title: "Garage Form", data });
};

export const calendar = (req, res) => {
  res.render("garage/calendar", { title: "Calendar" });
};

export const sessionEnd = (req, res) => {
  res.render("sessionEnd");
};

export const vehicles = async (req, res) => {
  res.render("customer", { active: "vehicle" });
};
export const vehiclesList = async (req, res) => {
  res.render("customer", { active: "vehicleList" });
};
export const service = async (req, res) => {
  res.render("customer", { active: "service" });
};
export const slot = async (req, res) => {
  res.render("customer", { active: "slots" });
};

export const getCities = async (req, res) => {
  try {
    const cities = await selectByFieldName(
      "city_master",
      "sid",
      req.params.state_id
    );
    res.status(201).json({ cities });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await findOne(req.user.email);
    if (!user) {
      return res
        .status(301)
        .json({ success: false, message: "User not found" });
    }
    const address = await getUserAddress(user[0].id);
    const vehicleServices = await getVehicleAssociatedServices(user[0].id);
    res.status(201).json({
      user: user[0],
      address: address[0],
      vehicleServices: vehicleServices,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const addVehicles = async (req, res) => {
  res.render("customer", { active: "addVehicle" });
};

export const servicesPage = async (req, res) => {
  res.render("customer", { active: "services" });
};

export const profile = async (req, res) => {
  const user = await findOne(req.user.email);

  res.render("customer", { active: "profile" });
};

export const appointment = async (req, res) => {
  res.render("customer", { active: "appointment" });
};

export const customerVehicleSelection = (req, res) => {
  res.render("customerVehicleSelection.ejs");
};

export const slotDisplay = async (req, res) => {
  res.render("customerSlots");
};

export const CustomerFeedback = async (req, res) => {
  res.render("customerFeedback.ejs");
};

export const garageList = (req, res) => {
  res.render("garage/garageList.ejs");
};

export const signUp = (req, res) => {
  res.render("auth/signUp", { title: "Sign Up" });
};

export const getGarageNotService = async (req, res) => {
  try {
    let id = req.params.id;
    const services = await getNotAvailableService([id]);
    res.status(201).json({ services });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const servicesListing = async (req, res) => {
  let { garageId } = req.params;
  try {
    const servicesList = await serviceListing(garageId);
    res.json(servicesList);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGarageCount = async (req, res) => {
  try {
    const user = await findOne([req.user.email]);
    const garageCount = await countByFieldName(
      "owner_has_garages",
      "owner_id",
      user[0].id
    );
    res.status(201).json({ success: true, garageCount });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const signIn = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

export const forgot = async (req, res) => {
  res.render("auth/forgotPassword", { title: "Forgot Password" });
};

export const resetPassword = async (req, res) => {
  res.render("auth/resetPassword", { title: "Reset Password" });
};

export const getAppointmentCount = async (req, res) => {
  try {
    const user = await findOne([req.user.email]);
    const { pending, successful, cancelled } = await countAppointments(
      user[0].id
    );
    res.status(201).json({ success: true, pending, successful, cancelled });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const editProfile = (req, res) => {
  res.render("garage/editProfile", { title: "Edit Profile" });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/u/signIn");
};

export const getAllCustomers = async (req, res) => {
  try {
    const result = await getCustomerNames(1);
    res.json({ result: result });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const garageAddress = async (req, res) => {
  try {
    const result = await getGarageAddress([req.params.garageId]);
    res.status(201).json({ address: result });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const selectServices = (req, res) => {
  res.render("customerServices");
};
