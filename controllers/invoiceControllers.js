import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { generatePdf } from "../helpers/pdfGenerator.js";
import { getInvoiceDetails, selectByFieldName } from "../utils/dbHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const customerInvoice = async (req, res) => {
  try {
    const { email } = req.user;
    const { appointmentId } = req.params;
    const user = await selectByFieldName("users", "email", email);
    if (user.length < 1) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    let invoiceDetails = await getInvoiceDetails([appointmentId, user[0].id]);
    if (invoiceDetails.length < 1) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    let fileContent = await ejs.renderFile(__dirname + "/../views/partials/customerInvoice.ejs", {
      data: JSON.stringify(invoiceDetails),
    });

    let result = await generatePdf(fileContent);
    if (!result) {
      return res.status(301).json({ success: false, message: "Something went wrong!" });
    }

    return res.status(200).json({ success: true, message: "Pdf has been generated" });
  } catch (error) {
    console.log(error);
    return res.status(301).json({ success: false, message: "Something went wrong!" });
  }
};
