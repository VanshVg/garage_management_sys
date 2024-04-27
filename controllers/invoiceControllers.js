import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { generatePdf } from "../helpers/pdfGenerator.js";
import { getInvoiceDetails, selectByFieldName, updateFields } from "../utils/dbHandler.js";
import { logger } from "../helpers/loger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    if (!result) throw "Something went wrong!";

    let updateResult = await updateFields(
      "appointments",
      { invoice_url: result },
      { id: appointmentId }
    );
    if (!updateResult.affectedRows) throw "Something went wrong!";

    return res.status(200).json({ success: true, message: "Pdf has been generated" });
  } catch (error) {
    logger.error(error);
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
};

export const downloadInvoice = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    let invoice = await selectByFieldName("appointments", "id", appointmentId);
    if (invoice.length < 1) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    return res.status(200).json({ success: true, pdf: invoice[0].invoice_url })
    // return res.download(`./public/invoices/${invoice[0].invoice_url}.pdf`, (err) => {
    //   if (err) {
    //     return res.status(301).json({ success: false, message: "Something went wrong!" });
    //   }
    // });

  } catch (error) {
    logger.error(error);
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
};
