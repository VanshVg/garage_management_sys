import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { findOne } from '../utils/dbHandler.js';
config();

export const isAlreadyLoggedIn = async (req, res, next) => {
  var flag = false;
  if (req.cookies) {
    if (req.cookies.token) {
      let result = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      if (!result.email) flag = true;
      else {
        result = await findOne(result.email);
        if (result[0]) {
          if (result[0].role_id == 0) res.redirect('/customer/home')
          else res.redirect('/owner/home');
        }
        else flag = true;
      }
    }
    else flag = true;
  }
  else flag = true;
  if (flag) next();
} 