import express from "express";

import authRoutes from './authRoutes.js';
import { notFound, sessionEnd, landingPage, getStates, getCities, getUserDetails, allServices } from '../controllers/staticControllers.js';
import { isAlreadyLoggedIn } from "../middlewares/isAlreadyLoggedIn.js";
import { logout } from '../controllers/userControllers.js';
import ownerRoutes from './ownerRoutes.js';
import customerRoutes from './customerRoutes.js';
import passport from "passport";
import { validateRole } from "../services/roleServices.js";

const router = express.Router();
// landing page
router.use('/owner', passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/sessionEnd",
}), validateRole(1), ownerRoutes);

router.use('/customer', passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/sessionEnd",
}), validateRole(0), customerRoutes);

router.get('/sessionEnd', sessionEnd);
router.get('/logout', logout);
router.use('/u', isAlreadyLoggedIn, authRoutes);

// fetch routes for getting dynamic data
router.get('/userDetails', passport.authenticate("jwt", {
  session: false,
  failureRedirect: '/sessionEnd',
}), getUserDetails);
router.get('/states', passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/sessionEnd",
}), getStates);
router.get('/cities/:state_id', passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/sessionEnd",
}), getCities);

router.get('/allServices', passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/sessionEnd",
}), allServices);
router.get('/', isAlreadyLoggedIn, landingPage);
router.all('*', notFound);
export default router;
