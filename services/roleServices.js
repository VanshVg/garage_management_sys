export const validateRole = (role_id) => (req, res, next) => {
  if (!req.user) {
    return res.redirect("/u/signIn");
  }
  console.log(req.user.role_id);
  if (req.user.role_id == role_id) {
    console.log("Inside");
    next();
  } else {
    res.redirect("/");
  }
}
