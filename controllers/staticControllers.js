import {
  selectByFieldName,
  selectByTableName,
  serviceListing,
  countAppointments,
  countByFieldName,
  countServices,
  getOwnerService,
  getUserAddress,
  getAppointments,
  getServices,
  getCustomerNames,
  getVehicleAssociatedServices,
  findOne,
  getGarageAddress,
  getBookedAppointments,
} from "../utils/dbHandler.js";

// landing page
export const landingPage = (req, res) => {
  res.render("landing", { title: "Garage Management System" });
};

export const home = async (req, res) => {
  res.render("index", { title: "Home", active: "dashboard" });
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
  res.render("index", { title: "customer", active: "customer" })
}

export const appointments = (req, res) => {
  res.render("index", { title: "Appointments", active: "appointment" });
};
export const inventory = (req, res) => {
  res.render("index", { title: "Inventory", active: "inventory" });
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

export const getStates = async (req, res) => {
  const states = await selectByTableName("state_master");
  res.status(201).json({ states });
};

export const getCities = async (req, res) => {
  const cities = await selectByFieldName(
    "city_master",
    "sid",
    req.params.state_id
  );
  res.status(201).json({ cities });
};

export const getUserDetails = async (req, res) => {
  const user = await findOne(req.user.email);
  if (!user) {
    return res.status(301).json({ success: false, message: "user not found" });
  }
  const address = await getUserAddress(user[0].id);
  const vehicleServices = await getVehicleAssociatedServices(user[0].id)
  res.status(201).json({ user: user[0], address: address[0], vehicleServices: vehicleServices });
};

export const allServices = async (req, res) => {
  const services = await getServices();
  res.status(201).json({ services });
};

export const servicesListing = async (req, res) => {
  const { garageId } = req.body;
  const servicesList = await serviceListing([garageId]);
  res.json(servicesList);
};

export const getGarageCount = async (req, res) => {
  const user = await findOne([req.user.email]);
  const garageCount = await countByFieldName(
    "owner_has_garages",
    "owner_id",
    user[0].id
  );
  res.status(201).json({ success: true, garageCount });
};

export const getServiceCount = async (req, res) => {
  const user = await findOne([req.user.email]);
  const serviceCount = await countServices(user[0].id);
  res.status(201).json({ success: true, serviceCount });
};

export const getAppointmentCount = async (req, res) => {
  const user = await findOne([req.user.email]);
  const { pending, successful, cancelled } = await countAppointments(user[0].id);
  res.status(201).json({ success: true, pending, successful, cancelled });
};

export const findOwnerService = async (req, res) => {
  const user = await findOne([req.user.email]);
  const { garageId } = req.body;
  const services = await getOwnerService(user[0].id, garageId);
  res.status(201).json({ success: true, services });
};

export const appointmentsListing = async (req, res) => {
  const user = await findOne([req.user.email]);
  let garage = req.params.garageId || 1;
  const appointments = await getAppointments([garage, user[0].id]);
  appointments.forEach(appointment => {
    appointment.date = appointment.startTime.slice(0, 10);
    appointment.startTime = appointment.startTime.slice(11, 16);
    appointment.endTime = appointment.endTime.slice(11, 16);
  });
  res.status(201).json({ success: true, appointments });
}
export const getAllCustomers = async (req, res) => {
  const result = await getCustomerNames(1)
  res.json({ result: result });
}

export const garageAddress = async (req, res) => {
  const result = await getGarageAddress([req.params.garageId]);
  res.status(201).json({ address: result });
}

export const selectServices = (req, res) => {
  res.render("customerServices");
}


export const daysCount = async (req, res) => {
  const user = await findOne([req.user.email]);
  const joined = user[0].created_at;
  const time = new Date().getTime() - new Date(joined).getTime();
  const days = Math.floor(time / (24 * 60 * 60 * 1000));
  res.status(201).json({ success: true, days });
}

export const bookedAppointments = async (req, res) => {
  const user = await findOne([req.user.email]);
  let result = await getBookedAppointments([req.params.id, user[0].id]);
  let appointments = [];
  result.forEach(res => {
    let temp = {};
    temp.customerName = res.customerName;
    temp.date = res.startTime.slice(0, 11);
    temp.startTime = res.startTime.slice(11, 16);
    temp.endTime = res.endTime.slice(11, 16);
    appointments.push(temp);
  });
  res.status(201).json({ success: false, appointments });
}