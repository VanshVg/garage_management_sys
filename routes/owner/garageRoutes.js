import express from "express";
import {
  garageForm,
  garageListing,
  getGarageCount,
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

const router = express.Router();

router.get("/", garageListing);
router.get("/garageForm", garageForm);
router.get("/garageUpdate", garageDisplay);
router.post("/add", garageValidator, garageAdd);
router.post("/update", garageValidator, garageUpdate);
router.post("/delete", garageDelete);
router.get("/garagelist", garageList);
router.get("/getGaragesList", paginationMiddleware(10), getGarageListing);
router.get("/count", getGarageCount);
export default router;
