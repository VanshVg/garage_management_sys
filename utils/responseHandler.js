export const responseHandler = (req, res) => {
  try {
    res.status(201).json({ success: true, data: req.data });
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
}