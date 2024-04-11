export const validateRole = (role_id) => (req, res, next) => {
  if (!req.user) {
    return res.redirect('/signIn');
  }
  if (req.user.role_id == role_id) {
    next();
  }
  else {
    res.end("You are not allowed to access this route");
  }
}