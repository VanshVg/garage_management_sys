export const garageAdd = (req, res) => {
  const { garageName } = req.body;

  if (!garageName) {
    res.status(500).json({ success: false, message: "Please provide garage name" })
  }

  else {
    res.status(200).json({ success: true, message: "Garage Registered" })
  }
}