import bcrypt from "bcrypt";
import { countRevenue, insertData, selectByFieldName, updateFields } from "../utils/dbHandler.js";

export const getPaymentDetails = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    let paymentDetails = await selectByFieldName("appointment_payments", "appointment_id", appointmentId);
    if (paymentDetails.length != 1) {
      return res.render("404", { title: "Some problem occured!" });
    }
    let finalAmount = parseFloat(paymentDetails[0].sub_total);
    if (paymentDetails[0].gst_amount != null) {
      finalAmount += parseFloat(paymentDetails[0].gst_amount);
    }
    if (paymentDetails[0].discount != null) {
      finalAmount += parseFloat(paymentDetails[0].discount);
    }
    return res.render("paymentDetails", { finalAmount });
  } catch (error) {
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
}

export const addPaymentDetails = async (req, res) => {
  try {
    for (let element in req.body) {
      if (req.body[element] == "") {
        req.body[element] = null;
      }
    }

    let { paymentType, bankName, cardNumber, accountHolder, cvv, expiryDate, upi } = req.body;
    const { appointmentId } = req.params;

    if (paymentType == "card") {
      let salt = await bcrypt.genSalt(10);
      cardNumber = await bcrypt.hash(cardNumber, salt);
      cvv = await bcrypt.hash(cvv, salt);
    }
    if (paymentType == "cash") {
      bankName = null;
    }

    let result = await insertData("payment_master", ["appointment_id", "payment_type", "bank_name", "card_number", "account_holder", "cvv", "expiry_date", "upi"], [appointmentId, paymentType, bankName, cardNumber, accountHolder, cvv, expiryDate, upi]);
    if (!result.insertId) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    let updateStatus = await updateFields("appointment_payments", { status: 1 }, { appointment_id: appointmentId });
    if (!updateStatus.affectedRows) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    return res.status(200).json({ success: true, message: "Payment done successfully" });
  } catch (error) {
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
}

export const generateRevenue = async (req, res) => {
  try {
    let result = await countRevenue(req.user.id);
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    result[0].revenue = formatter.format(result[0].revenue);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(301).json({ success: false, message: "Something went wrong!" })
  }
}