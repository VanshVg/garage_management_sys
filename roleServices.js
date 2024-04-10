export const validateRole = (role_id) => (req, res, next) => {
  if (req.user.role_id == role_id) {
    next();
  }
  else {
    res.end("something went wrong")
  }
}