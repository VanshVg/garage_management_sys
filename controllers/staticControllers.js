import {
  getCustomerNames,
  getGarageAddress,
  getNotAvailableService,

} from "../utils/dbHandler.js";

// landing page
export const landingPage = (req, res) => {
  res.render("landing", { title: "Garage Management System" });
};

export const dashboard = (req, res) => {
  res.render('index', { title: "Home", active: "dashboard" });
}

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
}

export const addVehicles = async (req, res) => {
  res.render("customer", { active: "addVehicle" });
}

export const servicesPage = async (req, res) => {
  res.render("customer", { active: "services" });
}

export const profile = async (req, res) => {
  res.render("customer", { active: "profile" });
}

export const appointment = async (req, res) => {
  res.render("customer", { active: "appointment" });
}

export const customerVehicleSelection = (req, res) => {
  res.render("customerVehicleSelection.ejs")
}

export const slotDisplay = async (req, res) => {
  res.render("customerSlots");
}

export const CustomerFeedback = async (req, res) => {
  res.render("customerFeedback.ejs")
}

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
    res.status(500).json({ success: false, message: "Something went wrong!" });
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
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const garageAddress = async (req, res) => {
  try {
    const result = await getGarageAddress([req.params.garageId]);
    res.status(201).json({ address: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const selectServices = (req, res) => {
  res.render("customerServices");
}
