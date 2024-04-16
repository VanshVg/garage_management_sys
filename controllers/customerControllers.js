import { getCustomerNames } from "../utils/dbHandler.js"

export const customeVehicleSlection = (req,res)=>{
    res.render("customerVehicleSelection.ejs")
}

export const getAllCustomers = async(req,res)=>{
    const result = await getCustomerNames(1)
    res.json({ result: result });
}
