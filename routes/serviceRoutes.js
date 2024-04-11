import express from "express";
import * as serviceController from "../controllers/serviceControllers.js";

const router = express.Router();

router.post("/:garageId", serviceController.addService);

export default router;
