import express from "express";
import * as userController from "../../controllers/userControllers.js";
import { uploadMiddleware } from "../../middlewares/uploadMiddleware.js";
import { userProfile, editProfile } from "../../controllers/staticControllers.js";
import upload from "../../helpers/fileUploads.js";

const router = express.Router();

router.get("/", userProfile);
router.get("/edit", userController.editProfile);
router.put("/update",  uploadMiddleware, userController.updateProfile);
router.get("/edit", editProfile);
router.put("/update", upload.single("thumbnail"), userController.updateProfile);

export default router;
