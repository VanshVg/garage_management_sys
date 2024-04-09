import express from "express";
import { home } from "../controllers/staticControllers.js";
import * as userController from "../controllers/userControllers.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/userValidation.js";
// garage route file
import * as garageRoutes from "./garageRoutes.js";

const router = express.Router();

<<<<<<< HEAD
// auth routes
router.get('/', userController.signUp);
router.post('/register', registerValidator, userController.register);
router.get('/signin', userController.signIn);
router.post('/login', loginValidator, userController.login);
=======
router.get("/", userController.signUp);
router.post("/register", userController.register);
router.get("/signin", userController.signIn);
router.post("/login", userController.login);
>>>>>>> b5eaeec8e3616f57952efc686a851c2b5151713d

// home page
router.get("/home", home);

// garage routes
// router.use('/garage', garageRoutes);

export default router;
