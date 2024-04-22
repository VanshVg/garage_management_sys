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
} from "../../controllers/garageControllers.js";
import upload from "../../helpers/fileUploads.js";

const router = express.Router();

router.get("/", garageListing);
router.get("/garageForm", garageForm);
router.get("/garageUpdate", garageDisplay);
router.post("/add", upload.single("thumbnail"), garageAdd);
router.put("/update", upload.single("thumbnail"), garageUpdate);
router.post("/delete", garageDelete);
router.get("/garageList", garageList);
router.get("/getGaragesList", getGarageListing);
router.get("/count", getGarageCount);
router.get("/customerList", customer);
router.get("/address/:garageId", garageAddress);
router.post("/slots", getGarageSlots);
router.post("/appointments", showGarageAppointments);
export default router;
