import { selectByFieldName } from "../utils/dbHandler.js";

export const getPaymentDetails = async(req, res) => {
  try {
    const { appointmentId } = req.params;

    let paymentDetails = await selectByFieldName("appointment_payments", "appointment_id", appointmentId);
    if(paymentDetails.length != 1) {
      return res.render("404", { title: "Some problem occured!" });
    }
    let finalAmount=parseFloat(paymentDetails[0].sub_total);
    if(paymentDetails[0].gst_amount != null) {
      finalAmount += parseFloat(paymentDetails[0].gst_amount);
    }
    if(paymentDetails[0].discount != null) {
      finalAmount += parseFloat(paymentDetails[0].discount);
    }
    return res.render("paymentDetails", { finalAmount });
  } catch (error) {
    console.log(error);
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
}