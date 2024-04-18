import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { findOne } from '../utils/dbHandler.js';

config();

export const isAlreadyLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return next();
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const { email } = decodedToken;

    if (!email) {
      return next();
    }

    const user = await findOne(email);

    if (!user || user.length === 0) {
      return next();
    }

    const { role_id } = user[0];
    const redirectUrl = role_id === 0 ? '/customer/home' : '/owner/home';
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Error in token verification:', error);
    next();
  }
};
