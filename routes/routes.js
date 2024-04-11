import express from "express";
import authRoutes from './authRoutes.js';
import ownerRoutes from './ownerRoutes.js';
import customerRoutes from './customerRoutes.js';
import { notFound } from '../controllers/staticControllers.js';
import passport from "passport";

import { applyPassportStrategy } from '../helpers/passport.js';
import { validateRole } from '../roleServices.js';
import { isAlreadyLoggedIn } from "../helpers/isAlreadyLoggedIn.js";
import { logout } from '../controllers/userControllers.js';

const router = express.Router();
applyPassportStrategy();

router.use('/owner',
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/u/signIn",
  }), validateRole(1), ownerRoutes
);

router.use('/customer',
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/u/signIn",
  }), validateRole(0), customerRoutes
);

router.get('/logout', logout);
router.use('/u', isAlreadyLoggedIn, authRoutes);
router.all('*', notFound);
export default router;
