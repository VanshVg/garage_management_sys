import express from "express";
import { profileValidator } from "../../validators/userValidation.js";
import * as userController from "../../controllers/userControllers.js";
import { userProfile, editProfile } from "../../controllers/staticControllers.js";
import upload from "../../helpers/fileUploads.js";

const router = express.Router();

router.get("/", userProfile);
router.get("/edit", editProfile);
router.put("/update", upload.single("thumbnail"), userController.updateProfile);

export default router;
