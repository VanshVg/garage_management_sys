import express from "express";
import { profileValidator } from "../validators/userValidation.js";
import * as userController from "../controllers/userControllers.js";

const router = express.Router();

router.put("/:userId", profileValidator, userController.updateProfile);

export default router;
