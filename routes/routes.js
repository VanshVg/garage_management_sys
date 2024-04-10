import express from 'express';
import { home, userProfile } from '../controllers/staticControllers.js';
import * as userController from "../controllers/userControllers.js";
import * as garageRoutes from "./garageRoutes.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/userValidation.js";
// garage route file


const router = express.Router();

// auth routes
router.get('/', userController.signUp);
router.post('/register', registerValidator, userController.register);
router.get('/signin', userController.signIn);
router.post('/login', loginValidator, userController.login);

// home page
router.get("/home", home);

// garage routes
// router.use('/garage', garageRoutes);

router.get('/profile', userProfile);

export default router;
