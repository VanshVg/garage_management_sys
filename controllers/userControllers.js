import { validationResult } from 'express-validator';
import { activateUser, deleteUserAddress, findAddressById, findOne, findOneById, insert, insertAddress, insertUserAddress, updateAddressById, updatePassword } from '../utils/dbHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = (req, res) => {
  res.render("auth/signUp", { title: "Sign Up" });
};

export const register = async (req, res) => {
  const { role_id, name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(301).json({ success: false, message: "Invalid payload" });
  } else {
    let result = await findOne(email);
    if (result.length) {
      res.status(301).json({
        success: false,
        message: "Email already exists please login to continue",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let token = Math.random().toString(36).slice(2);

      result = await insert([role_id, name, email, hashedPassword, token]);
      if (!result.length)
        res.status(201).json({
          success: true,
          message: "User registered successfully",
          userId: result,
          token,
        });
      else {
        res
          .status(301)
          .json({ success: false, message: "Something went wrong!" });
      }
    }
  }
};

export const activate = async (req, res) => {
  try {
    let id = req.params.id;
    let token = req.params.token;
    let data = await findOneById(id);
    if (token != data[0].activate_link) {
      res.render("login/error", {
        success: false,
        message: "Invalid token or token expired",
      });
    } else {
      let result = activateUser(id);
      res.render("auth/success", {
        success: true,
        message: "Your account is activated please login to continue",
      });
    }
  } catch (err) {
    res.status(301).json({ success: false, message: err.message });
  }
};

export const signIn = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }
  let { email, password } = req.body;
  let user = await findOne(email);
  if (!user || user?.length == 0) {
    return res
      .status(301)
      .json({ success: false, message: "Invalid email or password!" });
  } else {
    const isPassword = await bcrypt.compare(password, user[0].password);
    if (!isPassword) {
      return res
        .status(301)
        .json({ success: false, message: "Invalid email or Password" });
    } else if (!user[0].is_verified) {
      return res.status(301).json({
        success: false,
        message:
          "Your account is not activate please click the link to activate your account",
      });
    } else {
      const token = jwt.sign(
        { email: email },
        process.env.SECRET_KEY || "GarageManagementDB",
        {
          expiresIn: "1h",
        }
      );
      res.cookie("token", token, { maxAge: 1 * 60 * 60 * 1000 });
      return res.status(201).json({
        success: true,
        role_id: user[0].role_id,
        userId: user[0].id,
        message: "Logged in successfully",
      });
    }
  }
};

export const forgot = async (req, res) => {
  res.render("auth/forgotPassword", { title: "Forgot Password" });
};

export const forget = async (req, res) => {
  const email = req.body.email;
  let result = await findOne(email);
  if (!result[0]) {
    return res.status(301).json({
      success: false,
      message: "Invalid email address",
    });
  }
  return res.status(200).json({
    success: true,
    email: email,
  });
};

export const resetPassword = async (req, res) => {
  res.render("auth/resetPassword", { title: "Reset Password" });
};

export const reset = async (req, res) => {
  const { email, password } = req.body;
  let result = await findOne(email);
  if (!result[0]) {
    return res.status(301).json({
      success: false,
      message: "Invalid email address",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  result = await updatePassword(result[0].id, hashedPassword);
  return res.status(200).json({
    success: true,
    message: "password updated successfully",
  });
};

export const editProfile = (req, res) => {
  res.render("garage/editProfile", { title: "Edit Profile" });
};

export const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(301).json({ success: false, message: "Invalid payload" });
  }
  let { name, city, area, pincode } = req.body;

  let userResult = await updateUserByEmail([name, req.user.email]);
  if (userResult != 1) {
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }

  let user = await findOne(req.user.email);
  let address = await findAddressById(user[0].id);
  if (!address) {
    let result = await insertAddress([user[0].id, city, area, pincode]);
    if (!result) {
      return res
        .status(301)
        .json({ success: false, message: "Something went wrong!" });
    } else {
      await deleteUserAddress([user[0].id]);
      let userAddressResult = await insertUserAddress([user[0].id, city, area, pincode]);
      if (!userAddressResult) {
        return res
          .status(301)
          .json({ success: false, message: "Something went wrong!" });
      }
      return res
        .status(200)
        .json({ success: true, message: "User updated successfully" });
    }
  }

  let updateAddress = await updateAddressById([
    cityId,
    area,
    pincode,
    address.address_id,
  ]);
  if (updateAddress != 1) {
    return res
      .status(301)
      .json({ success: false, message: "Something went wrong!" });
  }

  return res
    .status(200)
    .json({ success: true, message: "User updated successfully" });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/u/signIn");
};
