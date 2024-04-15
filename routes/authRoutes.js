import express from 'express';
import passport from 'passport';

import { applyPassportStrategy } from '../middlewares/passport.js';
import * as userController from '../controllers/userControllers.js';
import { validateRole } from '../services/roleServices.js';
import ownerRoutes from './ownerRoutes.js'
import customerRoutes from './customerRoutes.js'
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetValidator,
} from "../validators/userValidation.js";

const router = express.Router();

router.get("/", userController.signIn);
router.post("/register", registerValidator, userController.register);

router.get("/signIn", userController.signIn);
router.post("/login", loginValidator, userController.login);

router.get("/activate/:id/:token", userController.activate);

router.get('/forgotPassword', userController.forgot);
router.post('/forgotPassword', forgotPasswordValidator, userController.forget);

router.get('/resetPassword/:email', userController.resetPassword);
router.post('/resetPassword', resetValidator, userController.reset);

//route control
applyPassportStrategy();

export default router;