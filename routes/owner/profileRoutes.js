import express from "express";
import { profileValidator } from "../../validators/userValidation.js";
import * as userController from "../../controllers/userControllers.js";
import { userProfile } from "../../controllers/staticControllers.js";
import upload from "../../helpers/fileUploads.js";

const router = express.Router();

router.get("/", userProfile);
router.get("/edit", userController.editProfile);
router.put("/update", upload.single("thumbnail"), userController.updateProfile);

export default router;
