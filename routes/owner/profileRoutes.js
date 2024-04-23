import express from "express";
import * as userController from "../../controllers/userControllers.js";
import { editProfile, userProfile } from "../../controllers/staticControllers.js";
import { uploadMiddleware } from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", userProfile);
router.get("/edit", editProfile);
router.put("/update",  uploadMiddleware, userController.updateProfile);

export default router;
