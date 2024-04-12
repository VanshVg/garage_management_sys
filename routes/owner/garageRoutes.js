import express from "express";
import { garageForm } from "../../controllers/staticControllers.js";
import { garageAdd, garageDelete, garageUpdate, garageDisplay, garageList } from "../../controllers/garageControllers.js";
import { garageValidator } from "../../validators/userValidation.js";
const router = express.Router();

router.get("/garageForm", garageForm);
router.get("/garageUpdate", garageDisplay)
router.post("/add", garageValidator, garageAdd);
router.post("/update", garageValidator, garageUpdate);
router.post("/delete", garageDelete);
router.get("/garagelist",garageList)
export default router;