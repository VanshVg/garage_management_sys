import express from "express";
import {
  customer,
  garageForm,
  garageListing,
  getGarageCount
} from "../../controllers/staticControllers.js";
import {
  garageAdd,
  garageDelete,
  garageUpdate,
  garageDisplay,
  garageList,
  getGarageListing,
} from "../../controllers/garageControllers.js";
import { garageValidator } from "../../validators/userValidation.js";
import { paginationMiddleware } from "../../helpers/pagination.js";
import upload from "../../helpers/fileUploads.js";

const router = express.Router();

router.get("/", garageListing);
router.get("/garageForm", garageForm);
router.get("/garageUpdate", garageDisplay);
router.post("/add", upload.single("thumbnail"), garageAdd);
router.post("/update", garageValidator, garageUpdate);
router.post("/delete", garageDelete);
router.get("/garageList", garageList);
router.get("/getGaragesList", paginationMiddleware(10), getGarageListing);
router.get("/count", getGarageCount);
router.get("/customerList",customer);
export default router;
