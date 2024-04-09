import express from "express";
import { home } from "../controllers/staticControllers.js";
import * as userController from "../controllers/userControllers.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/userValidation.js";
// garage route file
import * as garageRoutes from "./garageRoutes.js";

const router = express.Router();

router.get("/", userController.signUp);
router.post("/register", userController.register);
router.get("/signin", userController.signIn);
router.post("/login", userController.login);

// home page
router.get("/home", home);

// garage routes
// router.use('/garage', garageRoutes);

export default router;