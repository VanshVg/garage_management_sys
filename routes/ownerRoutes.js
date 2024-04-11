import express from 'express';
import { home } from "../controllers/staticControllers.js";
import garageRoutes from "./owner/garageRoutes.js";
import slotRoutes from './owner/slotRoutes.js';
import profileRoutes from "./owner/profileRoutes.js"
import serviceRoutes from "./owner/serviceRoutes.js"

const router = express.Router();

// slot routes
router.use('/slot', slotRoutes);

// service routes
router.use("/service", serviceRoutes);

// home page
router.get("/home", home);

// garage routes
router.use("/garage", garageRoutes);

// profile routes
router.use("/profile", profileRoutes);

export default router;