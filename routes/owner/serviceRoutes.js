import express from "express";
import { serviceValidator } from "../../validators/serviceValidation.js";
import * as serviceController from "../../controllers/serviceControllers.js";
import { services } from "../../controllers/staticControllers.js";

const router = express.Router();

router.get('/', services);
router.post("/:garageId", serviceValidator, serviceController.addService);
router.delete("/:garageId", serviceValidator, serviceController.deleteService);
router.get('/count', serviceController.getServiceCount);


export default router;
