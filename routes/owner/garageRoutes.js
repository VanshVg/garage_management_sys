import express from "express";
import {
  garageForm,
  garageList,
  garageListing,
} from "../../controllers/staticControllers.js";
import {
  garageAdd,
  garageDelete,
  garageAddress,
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
router.get("/address/:garageId", garageAddress);
router.post("/slots", getGarageSlots);
router.get("/appointments/:garageId", showGarageAppointments);
export default router;
