import express from 'express';
import { home } from '../controllers/staticControllers.js';
import { signUp, register, login } from '../controllers/loginControllers.js'

const router = express.Router();

router.get('/', signUp);
router.post('/register', register);
router.get('/login', login);

// home page
router.get('/home', home);

export default router;