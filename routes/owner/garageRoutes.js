import express from "express";
import { garageAdd, garageDelete, garageUpdate } from "../../controllers/garageControllers.js";
import { garageValidator } from "../../validators/userValidation.js";
const router = express.Router();

router.post("/add", garageValidator, garageAdd);
router.post("/update", garageValidator, garageUpdate);
router.post("/delete", garageDelete);

export default router;
