import express from "express";
import { garageAdd } from "../controllers/garageControllers.js";
const router = express.Router();

router.post("/add", garageAdd);

export default router;
