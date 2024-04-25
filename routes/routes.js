import express from "express";

import authRoutes from "./authRoutes.js";

import {
  notFound,
  landingPage,
  sessionEnd,
} from "../controllers/staticControllers.js";
import { isAlreadyLoggedIn } from "../middlewares/isAlreadyLoggedIn.js";
import ownerRoutes from "./ownerRoutes.js";
import customerRoutes from "./customerRoutes.js";
import commonRoutes from "./commonRoutes.js";
import passport from "passport";
import { validateRole } from "../services/roleServices.js";
import { garageCount } from "../controllers/garageControllers.js";
import { customerCount } from "../controllers/customerControllers.js";
import { serviceCount } from "../controllers/serviceControllers.js";
import { customerInvoice } from "../controllers/invoiceControllers.js";

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
router.get('/garagesCount', garageCount);
router.get('/customerCount', customerCount);
router.get('/serviceCount', serviceCount);

// landing page
router.get("/", isAlreadyLoggedIn, landingPage);

// common routes used on both customer and owner side
router.use(
  "/",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/sessionEnd",
  }),
  commonRoutes
);

// Invoice route
router.post("/invoice/:appointmentId", customerInvoice);

// 404 not found
router.all("*", notFound);

export default router;
