import express from "express";
import { garageAdd, garageDelete, garageUpdate,garageList } from "../controllers/garageControllers.js";
import { garageValidator } from "../validators/userValidation.js";
const router = express.Router();

router.post("/add", garageValidator, garageAdd);
router.post("/update", garageValidator, garageUpdate);
router.post("/delete", garageDelete);
router.get("/garagelist",garageList)
export default router;
