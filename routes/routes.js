import express from "express";

import authRoutes from "./authRoutes.js";

import {
  notFound,
  landingPage,
  sessionEnd
} from "../controllers/staticControllers.js";
import { isAlreadyLoggedIn } from "../middlewares/isAlreadyLoggedIn.js";
import ownerRoutes from "./ownerRoutes.js";
import customerRoutes from "./customerRoutes.js";
import commonRoutes from "./commonRoutes.js";
import passport from "passport";
import { validateRole } from "../services/roleServices.js";

const router = express.Router();

router.get("/sessionEnd", sessionEnd);

// owner routes
router.use(
  "/owner",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/sessionEnd",
  }),
  validateRole(1),
  ownerRoutes
);

// customer routes
router.use(
  "/customer",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/sessionEnd",
  }),
  validateRole(0),
  customerRoutes
);

// authentication routes
router.use("/u", isAlreadyLoggedIn, authRoutes);

// landing page
router.get("/", isAlreadyLoggedIn, landingPage);

// common routes used on both customer and owner side
router.use('/',
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/sessionEnd",
  }),
  commonRoutes);

// 404 not found
router.all("*", notFound);

export default router;
