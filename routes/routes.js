import express from "express";
import { home, userProfile } from "../controllers/staticControllers.js";
import * as userController from "../controllers/userControllers.js";
import garageRoutes from "./garageRoutes.js";
import passport from "passport";
import {
  registerValidator,
  loginValidator,
} from "../validators/userValidation.js";
import { slotValidator } from "../validators/slotValidation.js";
import {
  slotBooking,
  slotDelete,
  slotUpdate,
} from "../controllers/slotBookingController.js";

// garage route file
import profileRoutes from "./profileRoutes.js"
import serviceRoutes from "./serviceRoutes.js"
import { applyPassportStrategy } from '../auth/auth.js';
import { validateRole } from '../roleServices.js';

const router = express.Router();
applyPassportStrategy();
// auth routes
router.get("/", userController.signUp);
router.post("/register", registerValidator, userController.register);
router.get("/signin", userController.signIn);
router.post("/login", loginValidator, userController.login);
router.get("/activate/:id/:token", userController.activate);
// home page
router.get("/home", home);

// garage routes
router.use("/garage", garageRoutes);

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/signIn",
  }),
  validateRole(1),
  userProfile
);

router.use("/profile", profileRoutes);

// slot routes
router.post('/slotinsert', slotBooking)
router.post('/slotupdate', slotUpdate)
router.post('/slotdelete', slotDelete)

router.use("/service", serviceRoutes)
export default router;
