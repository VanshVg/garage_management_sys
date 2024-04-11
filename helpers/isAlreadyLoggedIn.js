import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const isAlreadyLoggedIn = (req, res, next) => {
  var flag = false;
  if (req.cookies) {
    if (req.cookies.token) {
      let result = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      if (!result.email) flag = true;
    }
    else flag = true;
  }
  else flag = true;
  if (flag) next();
  else res.redirect('/home');
} 