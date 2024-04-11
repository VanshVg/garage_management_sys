export const home = (req, res) => {
  res.render('index', { title: "Home" });
}

export const userProfile = (req, res) => {
  res.render('garage/profile', { title: "Profile" });
}

// garage form display 
export const garageForm = (req, res) => {
  let data = [{}];
  res.render('garage/garageModule', { title: "Garage Form", data })
}
