import { countAppointments, getAppointments, getBookedAppointments } from "../utils/dbHandler.js";

export const appointmentsListing = async (req, res) => {
  try {
    let garage = req.params.garageId || 1;
    const appointments = await getAppointments([garage, req.user.id]);
    appointments.forEach(appointment => {
      appointment.date = appointment.startTime.slice(0, 10);
      appointment.startTime = appointment.startTime.slice(11, 16);
      appointment.endTime = appointment.endTime.slice(11, 16);
    });
    res.status(201).json({ success: true, appointments });
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
}

export const bookedAppointments = async (req, res) => {
  try {
    let result = await getBookedAppointments(req.user.id);
    let appointments = [];
    result.forEach(res => {
      let temp = {};
      temp.garageName = res.garageName;
      temp.customerName = res.customerName;
      temp.date = res.startTime.slice(0, 11);
      temp.startTime = res.startTime.slice(11, 16);
      temp.endTime = res.endTime.slice(11, 16);
      appointments.push(temp);
    });
    res.status(201).json({ success: false, appointments });
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
}

export const getAppointmentCount = async (req, res) => {
  try {
    const { pending, successful, cancelled } = await countAppointments(req.user.id);
    res.status(201).json({ success: true, pending, successful, cancelled });
  } catch (error) {
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};