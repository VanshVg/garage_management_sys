import express from 'express';
import { customerHome } from '../controllers/staticControllers.js';
const router = express.Router();

router.get('/home', customerHome);


export default router;