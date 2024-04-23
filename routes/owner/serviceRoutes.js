import express from "express";
import { serviceValidator } from "../../validators/serviceValidation.js";
import * as serviceController from "../../controllers/serviceControllers.js";
import { getGarageNotService, services } from "../../controllers/staticControllers.js";

const router = express.Router();

router.get('/', services);
router.post("/", serviceValidator, serviceController.addService);
router.delete("/:id", serviceValidator, serviceController.deleteService);
router.get('/count', serviceController.getServiceCount);
router.get('/all/:id', getGarageNotService)


export default router;
