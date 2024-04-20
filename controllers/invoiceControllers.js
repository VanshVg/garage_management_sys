import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { generatePdf } from "../helpers/pdfGenerator.js";
import { getInvoiceDetails, selectByFieldName, updateFields } from "../utils/dbHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const customerInvoice = async (req, res) => {
  try {
    let email;
    if(req.body.customerEmail) {
      email = req.body.customerEmail;
    } else {
      email = req.user.email;
    }
    const { appointmentId } = req.params;
    const user = await selectByFieldName("users", "email", email);
    if (user.length < 1) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }
    
    let invoiceDetails = await getInvoiceDetails([appointmentId, user[0].id]);
    console.log(invoiceDetails);
    if (invoiceDetails.length < 1) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }
    
    let fileContent = await ejs.renderFile(__dirname + "/../views/partials/customerInvoice.ejs", {
      data: JSON.stringify(invoiceDetails),
    });
    
    let result = await generatePdf(fileContent, user[0].id, appointmentId);
    if (!result) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    let updateResult = await updateFields(
      "appointments",
      { invoice_url: result },
      { customer_id: user[0].id }
    );
    if (!updateResult.affectedRows) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    return res.status(200).json({ success: true, message: "Pdf has been generated" });
  } catch (error) {
    console.log(error);
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
};