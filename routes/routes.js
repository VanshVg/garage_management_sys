import express from "express";

import authRoutes from './authRoutes.js';
import { notFound, landingPage } from '../controllers/staticControllers.js';
import { isAlreadyLoggedIn } from "../middlewares/isAlreadyLoggedIn.js";
import { logout } from '../controllers/userControllers.js';
import ownerRoutes from './ownerRoutes.js';
import customerRoutes from './customerRoutes.js';
import passport from "passport";
import { validateRole } from "../services/roleServices.js";

const router = express.Router();
// landing page
router.get('/', landingPage);
router.use('/owner', passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/u/signIn",
}), validateRole(1), ownerRoutes);

router.use('/customer', passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/u/signIn",
}), validateRole(0), customerRoutes);

router.get('/logout', logout);
router.get("/", (req, res) => {
  res.render("landing.ejs")
})
router.use('/u', isAlreadyLoggedIn, authRoutes);
router.all('*', notFound);
export default router;
