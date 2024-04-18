import { generatePdf } from "../helpers/pdfGenerator.js"
import { customerSlotListing, getCustomerNames } from "../utils/dbHandler.js"
import fs from "fs"

export const customerVehicleSelection = (req, res) => {
    res.render("customerVehicleSelection.ejs")
}

export const getAllCustomers = async (req, res) => {
    const result = await getCustomerNames(1)
    res.json({ result: result });
}

export const slotDisplay = async (req, res) => {
    res.render("customerSlots");
}
export const customerSlotSelection = async (req, res) => {
    // let garageId = 1;
    // let startDate = '2020-01-01';
    // let endDate = '2020-01-02';
    let { garageId, startDate, endDate } = req.body;
    const result = await customerSlotListing(garageId, startDate, endDate);

    res.json(result);
}

export const customerInvoice = async (req, res) => {
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

