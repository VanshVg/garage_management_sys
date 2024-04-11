import express from "express";
import authRoutes from './authRoutes.js';
import ownerRoutes from './ownerRoutes.js';
import passport from "passport";

import { applyPassportStrategy } from '../helpers/passport.js';
import { validateRole } from '../roleServices.js';
import { isAlreadyLoggedIn } from "../helpers/isAlreadyLoggedIn.js";
import { logout } from '../controllers/userControllers.js';

const router = express.Router();
applyPassportStrategy();

router.get('/owner',
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/signIn",
  }), validateRole(1), ownerRoutes);

router.get('/logout', logout);
router.use('/', isAlreadyLoggedIn, authRoutes);
export default router;
