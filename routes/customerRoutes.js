import express from "express";
import {
  customerHome,
  customerProfile,
} from "../controllers/staticControllers.js";
const router = express.Router();

router.get("/home", customerHome);

router.get("/profile", customerProfile);

export default router;
