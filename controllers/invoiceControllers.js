import fs from "fs";
import { generatePdf } from "../helpers/pdfGenerator.js";
import { getInvoiceDetails, selectByFieldName } from "../utils/dbHandler.js";

export const downloadCustomerInvoice = async (req, res) => {
  try {
    fs.readFile("./views/partials/customerInvoice.ejs", "utf-8", async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(301).json({ success: false, message: "Something went wrong!" });
      } else {
        await generatePdf(data);
        return res.download("./public/invoices/abc.pdf", (err) => {
          if (err) {
            return res.status(301).json({ success: false, message: "Something went wrong!" });
          }
        });
      }
    });
  } catch (error) {
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
};

export const customerInvoice = async (req, res) => {
  try {
    const { email } = req.user;
    const { appointmentId } = req.params;
    const user = await selectByFieldName("users", "email", email);
    if(user.length < 1) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    let invoiceDetails = await getInvoiceDetails([appointmentId, user[0].id]);
    if(invoiceDetails.length < 1) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }
    return res.status(200).json({success: true, invoiceDetails})
  } catch (error) {
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
}