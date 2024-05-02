// landing page
export const landingPage = (req, res) => {
  res.render("landingPage", { title: "Garage Management System" });
};

// owner dashboard
export const dashboard = async (req, res) => {
  res.render("index", { title: "Home", active: "dashboard" });
};

// customer home page
export const home = async (req, res) => {
  res.render("customer", { title: "Home", active: "dashboard" });
};

// owner profile
export const userProfile = async (req, res) => {
  res.render("index", { title: "Profile", active: "profile" });
};

// owner garages listing
export const garageListing = (req, res) => {
  res.render("index", { title: "Garages", active: "garages" });
};

// owner services listing
export const services = (req, res) => {
  res.render("index", { title: "Services", active: "services" });
};

// owner slots listing
export const slots = (req, res) => {
  res.render("index", { title: "Slots", active: "slots" });
};

// owner appointments listing
export const appointments = (req, res) => {
  res.render("index", { title: "Appointments", active: "appointment" });
};

// owner inventory listing
export const inventory = (req, res) => {
  res.render("index", { title: "Inventory", active: "inventory" });
};

// owner tasks listing
export const tasks = (req, res) => {
  res.render("index", { title: "Tasks", active: "tasks" });
};

// owner employee listing
export const employee = (req, res) => {
  res.render("index", { title: "Employees", active: "employee" });
};

// owner invoice listing
export const invoice = (req, res) => {
  res.render("index", { title: "Invoice", active: "invoice" });
};

// 404 page for unknown routes
export const notFound = (req, res) => {
  res.render("404", { title: "404 Not Found!" });
};

// garage form display
export const garageForm = (req, res) => {
  let data = [{}];
  res.render("garage/garageModule", { title: "Garage Form", data });
};

// calendar display on owner side
export const calendar = (req, res) => {
  res.render("garage/calendar", { title: "Calendar" });
};

// session end alert message
export const sessionEnd = (req, res) => {
  res.render("sessionEnd");
};

// customer vehicle page
export const vehicles = async (req, res) => {
  res.render("customer", { active: "vehicle" });
};

// listing of customer vehicles
export const vehiclesList = async (req, res) => {
  res.render("customer", { active: "vehicleList" });
};

// services listing for customer
export const service = async (req, res) => {
  res.render("customer", { active: "service" });
};

// slots listing with calendar for customer
export const slot = async (req, res) => {
  res.render("customer", { active: "slots" });
};

// payment page for customer
export const payment = async (req, res) => {
  res.render("customer", { active: "payment" });
};

// add vehicle form for customer
export const addVehicles = async (req, res) => {
  res.render("customer", { active: "addVehicle" });
};

// customers profile page
export const profile = async (req, res) => {
  res.render("customer", { active: "profile" });
};

// customer appointments listing
export const appointment = async (req, res) => {
  res.render("customer", { active: "appointment" });
};

// customer vehicle listing
export const customerVehicleSelection = (req, res) => {
  res.render("customerVehicleSelection.ejs");
};

export const CustomerFeedback = async (req, res) => {
  res.render("customer/customerFeedback.ejs");
};

// garages listing
export const garageList = (req, res) => {
  res.render("garage/garageList.ejs");
};

// sign up page
export const signUp = (req, res) => {
  res.render("auth/signUp", { title: "Sign Up" });
};

// sign in page
export const signIn = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

// forgot password page
export const forgot = async (req, res) => {
  res.render("auth/forgotPassword", { title: "Forgot Password" });
};

// reset password page
export const resetPassword = async (req, res) => {
  res.render("auth/resetPassword", { title: "Reset Password" });
};

// edit profile page
export const editProfile = (req, res) => {
  res.render("garage/editProfile", { title: "Edit Profile" });
};

// logout user
export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/u/signIn");
};