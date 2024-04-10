export const home = (req, res) => {
  res.render('index', { title: "Home" });
}

export const userProfile = (req, res) => {
  res.render('garage/profile', { title: "Profile" });
}