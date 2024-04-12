// landing page
export const landingPage = (req, res) => {
  res.render('landingPage', { title: "Garage Management System" });
}

export const home = (req, res) => {
  res.render('index', { title: "Home" });
}

export const userProfile = (req, res) => {
  res.render('garage/profile', { title: "Profile" });
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
