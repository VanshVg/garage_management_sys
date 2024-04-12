import express from "express";

import authRoutes from './authRoutes.js';
import { notFound } from '../controllers/staticControllers.js';
import { isAlreadyLoggedIn } from "../middlewares/isAlreadyLoggedIn.js";
import { logout } from '../controllers/userControllers.js';
import ownerRoutes from './ownerRoutes.js';
import customerRoutes from './customerRoutes.js';
import passport from "passport";
import { validateRole } from "../services/roleServices.js";

const router = express.Router();

router.use('/owner', passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/u/signIn",
}), validateRole(1), ownerRoutes);

router.use('/customer', passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/u/signIn",
}), validateRole(0), customerRoutes);

router.get('/logout', logout);
router.use('/u', isAlreadyLoggedIn, authRoutes);
router.all('*', notFound);
export default router;
