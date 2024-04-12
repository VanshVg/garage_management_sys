export const home = (req, res) => {
  res.render('index', { title: "Home", active: 'dashboard' });
}

export const userProfile = (req, res) => {
  res.render('index', { title: "Profile", active: 'profile' });
}

export const garageListing = (req, res) => {
  res.render('index', { title: "Garages", active: 'garages' });
}

export const services = (req, res) => {
  res.render('index', { title: "Services", active: 'services' });
}

export const slots = (req, res) => {
  res.render('index', { title: "Slots", active: 'slots' });
}

export const appointments = (req, res) => {
  res.render('index', { title: "Appointments", active: 'appointment' });
}

export const customerHome = (req, res) => {
  res.render('customer', { title: "Home" });
}

export const notFound = (req, res) => {
  res.render('404', { title: "404 Not Found!" });
}
// garage form display 
export const garageForm = (req, res) => {
  let data = [{}];
  res.render('garage/garageModule', { title: "Garage Form", data })
}

export const calendar = (req, res) => {
  res.render('garage/calendar', { title: "Calendar" });
}

export const sessionEnd = (req, res) => {
  res.render('sessionEnd');
}