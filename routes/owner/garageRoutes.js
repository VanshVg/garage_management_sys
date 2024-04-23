import express from "express";
import {
  customer,
  garageAddress,
  garageForm,
  garageList,
  garageListing,
} from "../../controllers/staticControllers.js";
import {
  garageAdd,
  garageDelete,
  garageUpdate,
  garageDisplay,
  getGarageListing,
  getGarageSlots,
  getGarageCount,
  showGarageAppointments,
} from "../../controllers/garageControllers.js";
import { uploadMiddleware } from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", garageListing);
router.get("/garageForm", garageForm);
router.get("/garageUpdate", garageDisplay);
router.post("/add", uploadMiddleware, garageAdd);
router.put("/update", uploadMiddleware, garageUpdate);
router.delete("/delete/:garageId", garageDelete);
router.get("/garageList", garageList);
router.get("/getGaragesList", getGarageListing);
router.get("/count", getGarageCount);
router.get("/customerList", customer);
router.get("/address/:garageId", garageAddress);
router.post("/slots", getGarageSlots);
router.post("/appointments", showGarageAppointments);
export default router;
