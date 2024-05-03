import bcrypt from "bcrypt";
import { logger } from "../helpers/logger.js";
import {
  countRevenue,
  insertData,
  selectByFieldName,
  updateFields,
  getPaymentStatusService
} from "../utils/dbHandler.js";

// get payment details of an appointment
export const getPaymentDetails = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    let paymentDetails = await selectByFieldName(
      "appointment_payments",
      "appointment_id",
      appointmentId
    );
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
    return res.render("customer/paymentDetails", { finalAmount });
  } catch (error) {
    logger.error(error);
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }
};

// add payment details 
export const addPaymentDetails = async (req, res) => {
  try {
    for (let element in req.body) {
      if (req.body[element] == "") {
        req.body[element] = null;
      }
    }

    let {
      paymentType,
      bankName,
      cardNumber,
      accountHolder,
      cvv,
      expiryDate,
      upi,
      finalAmount,
    } = req.body;
    const { appointmentId } = req.params;

    if (paymentType == "card") {
      let salt = await bcrypt.genSalt(10);
      cardNumber = await bcrypt.hash(cardNumber, salt);
      cvv = await bcrypt.hash(cvv, salt);
    }
    if (paymentType == "cash") {
      bankName = null;
    }

    let result = await insertData(
      "payment_master",
      [
        "appointment_id",
        "payment_type",
        "bank_name",
        "card_number",
        "account_holder",
        "cvv",
        "card_expiry_date",
        "upi_id",
        "amount",
      ],
      [
        appointmentId,
        paymentType,
        bankName,
        cardNumber,
        accountHolder,
        cvv,
        expiryDate,
        upi,
        finalAmount,
      ]
    );
    if (!result.insertId) {
      return res
        .status(301)
        .json({ success: false, message: "Something went wrong!" });
    }

    let updateStatus = await updateFields(
      "appointment_payments",
      { status: 2 },
      { appointment_id: appointmentId }
    );
    if (!updateStatus.affectedRows) {
      return res
        .status(301)
        .json({ success: false, message: "Something went wrong!" });
    }
    let updateAppointment = await updateFields(
      "appointments",
      { status: 4 },
      { id: appointmentId }
    );
    if (!updateAppointment.affectedRows) {
      return res
        .status(301)
        .json({ success: false, message: "Something went wrong!" });
    }
    return res.status(200).json({
      success: true,
      message: "Payment done successfully",
      customerEmail: req.user.email,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }
};

// generate revenue for a garage owner
export const generateRevenue = async (req, res) => {
  try {
    let result = await countRevenue(req.user.id);
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    result[0].revenue = formatter.format(result[0].revenue);
    res.status(200).json({ success: true, result });
  } catch (error) {
    logger.error(error);
    res.status(301).json({ success: false, message: "Something went wrong!" });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const result = await getPaymentStatusService(appointmentId);
    res.status(200).json({ success: true, result });
  } catch (err) {
    logger.error(err);
    res.status(301).json({ success: false, message: "Something went wrong!" });
  }
};