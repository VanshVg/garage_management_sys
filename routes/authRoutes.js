import * as userController from '../controllers/userControllers.js';
import express from 'express';
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetValidator,
} from "../validators/userValidation.js";


const router = express.Router();
router.get("/", userController.signUp);
router.post("/register", registerValidator, userController.register);
router.get("/signIn", userController.signIn);
router.post("/login", loginValidator, userController.login);
router.get("/activate/:id/:token", userController.activate);
router.get('/forgotPassword', userController.forgot);
router.post('/forgotPassword', forgotPasswordValidator, userController.forget);
router.get('/resetPassword/:email', userController.resetPassword);
router.post('/resetPassword', resetValidator, userController.reset);

export default router;