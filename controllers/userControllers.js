import { validationResult } from 'express-validator';
import { activateUser, findOne, findOneById, insert } from '../utils/dbHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = (req, res) => {
  res.render('login/signUp', { title: 'Sign Up' });
}

export const register = async (req, res) => {
  const { role_id, name, email, password } = req.body;
  console.log(name);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(301).json({ success: false, errors: errors.array() });
  }
  else {
    let result = await findOne(email);
    if (result) {
      res.status(301).json({ success: false, message: "Email already exists please login to continue" });
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let token = Math.random().toString(36).slice(2);

      result = await insert([role_id, name, email, hashedPassword, token]);
      console.log(result);
      if (result)
        res
          .status(201)
          .json({ message: "User registered successfully", userId: result, token });
      else {
        res.status(301).json({ success: false, message: "Something went wrong!" });
      }
    }
  }
}

export const activate = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      let token = req.query.token;
      let data = await findOneById(id);
      if (token != data[0].activate_link) {
        return resolve(res.render('login/error', { success: false, message: "Invalid token or token expired" }));
      }
      else {
        let result = activateUser(sql);
        return resolve(res.status(201).json({ success: true, message: "Your account is activated please login to continue" }));
      }
    } catch (err) {
      return reject(res.status(301).json({ success: false, message: err.message }));
    }
  });
}

export const signIn = (req, res) => {
  res.render('login/login', { title: 'Login' });
}

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Invalid credentials" });
  }
  let { email, password } = req.body;
  let user = await findOne(email);
  if (user.length == 0) {
    return res.status(301).json({ success: false, message: "Invalid email or password!" });
  }
  else {
    // user = user[0];
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(301).json({ success: false, message: "Invalid email or Password" });
    }
    else if (!user.is_verified) {
      return res.status(301).json({ success: false, message: "Your account is not activate please click the link to activate your account" });
    }
    else {
      const token = jwt.sign(
        { email: email },
        process.env.SECRET_KEY || "GarageManagementDB",
        {
          expiresIn: "1h",
        }
      );
      res.cookie('token', token, { maxAge: 1 * 60 * 60 * 1000 });
      return res.status(201).json({ success: true, message: "Logged in successfully" });
    }
  }
}