import ejs from "ejs";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { generatePdf } from "../helpers/pdfGenerator.js";
import {
  getInvoiceDetails,
  selectByFieldName,
  updateFields,
} from "../utils/dbHandler.js";
import { logger } from "../helpers/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// generate invoice for customer
export const customerInvoice = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    let email;
    if (req.body.customerEmail) {
      email = req.body.customerEmail;
    } else {
      email = req.user.email;
    }

    let user = await selectByFieldName("users", "email", email);
    if (user.length < 1) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
    let invoiceDetails = await getInvoiceDetails([appointmentId, user[0].id]);
    if (invoiceDetails.length < 1) {
      return res
        .status(301)
        .json({ success: false, message: "Something went wrong!" });
    }
    let fileContent = await ejs.renderFile(
      __dirname + "/../views/partials/customerInvoice.ejs",
      {
        data: JSON.stringify(invoiceDetails),
      }
    );

    let result = await generatePdf(fileContent, user[0].id, appointmentId);

    let updateResult = await updateFields(
      "appointments",
      { invoice_url: result },
      { id: appointmentId }
    );

    if (!updateResult.affectedRows) throw "Something went wrong!";

    return res
      .status(200)
      .json({ success: true, message: "Pdf has been generated", pdf: result });
  } catch (error) {
    logger.error(error);
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }
};

// delete generated invoice after download
export const deletePdf = async (req, res) => {
  try {
    const { fileName } = req.params;
    fs.unlink(
      path.join(__dirname, "../public/invoices/", fileName + ".pdf"),
      (err) => {
        if (err) {
          throw "Something went wrong!";
        } else {
          return res
            .status(200)
            .json({ success: true, message: "PDF Deleted Successfully!" });
        }
      }
    );
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};
