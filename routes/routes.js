import express from "express";

import authRoutes from './authRoutes.js';
import { notFound } from '../controllers/staticControllers.js';
import { isAlreadyLoggedIn } from "../middlewares/isAlreadyLoggedIn.js";
import { logout } from '../controllers/userControllers.js';

const router = express.Router();

router.get('/logout', logout);
router.use('/', isAlreadyLoggedIn, authRoutes);
router.all('*', notFound);
export default router;
