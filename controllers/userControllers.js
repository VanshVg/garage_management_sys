import { validationResult } from "express-validator";
import {
  activateUser,
  deleteUserAddress,
  findAddressById,
  findOneById,
  getUserAddress,
  getVehicleAssociatedServices,
  insertAddress,
  insertData,
  insertUserAddress,
  selectByFieldNames,
  updateAddressById,
  updateFields,
  updatePassword,
  updateUserByEmail,
} from "../utils/dbHandler.js";
import { insert, findOne } from "../utils/common.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "../helpers/logger.js";

// register new user
export const register = async (req, res) => {
  try {
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

        result = await insert(
          "users",
          ["role_id", "name", "email", "password", "activate_link"],
          [role_id, name, email, hashedPassword, token]
        );
        if (!result.length)
          res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId: result,
            token,
          });
        else throw "Something went wrong!";
      }
    }
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

// verify user identity with email
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
    logger.error(err);
    res.status(301).json({ success: false, message: "Something went wrong!" });
  }
};

// verify user credentials and set token if user is valid
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payload" });
    }
    let { email, password } = req.body;

    let user = await findOne(email);
    if (!user || user?.length == 0 || user.error) {
      return res
        .status(301)
        .json({ success: false, message: "Invalid email or password!" });
    } else {
      let userIp = req.socket.remoteAddress;
      let userLog = await selectByFieldNames("login_logs", {
        user_id: user[0].id,
        attempt_sys_ip: userIp,
      });
      if (userLog.length == 0) {
        let insertLog = await insertData(
          "login_logs",
          ["user_id", "attempt_count", "attempt_sys_ip"],
          [user[0].id, 1, userIp]
        );
        if (!insertLog.insertId) {
          return res
            .status(500)
            .json({ success: false, message: "Something went wrong!" });
        }
      } else {
        let updateLog = await updateFields(
          "login_logs",
          { attempt_count: userLog[0].attempt_count + 1 },
          { user_id: user[0].id, attempt_sys_ip: userIp }
        );
        if (!updateLog.affectedRows) {
          return res
            .status(500)
            .json({ success: false, message: "Something went wrong!" });
        }
      }

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
          { expiresIn: "1w" } // Change to 1 week
        );

        res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Set cookie for 1 week
        return res.status(201).json({
          success: true,
          role_id: user[0].role_id,
          userId: user[0].id,
          message: "Logged in successfully",
        });
      }
    }
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// send link to reset user password
export const forget = async (req, res) => {
  try {
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
      email,
    });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// update user password
export const reset = async (req, res) => {
  try {
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

    let log = await insertData(
      "password_change_logs",
      ["user_id", "password"],
      [result[0].id, result[0].password]
    );

    result = await updatePassword(result[0].id, hashedPassword);

    if (!log.affectedRows) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }

    return res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// update user profile
export const updateProfile = async (req, res) => {
  try {
    let { name, city, area, pincode, bio } = req.body;
    let thumbnail = req.file?.filename || "";
    let userResult = await updateUserByEmail([
      name,
      bio,
      thumbnail,
      req.user.email,
    ]);
    if (userResult != 1) {
      return res
        .status(301)
        .json({ success: false, message: "Something went wrong!" });
    }

    let userId = req.user.id;
    let address = await findAddressById(userId);
    if (!address) {
      let result = await insertAddress([city, area, pincode]);
      if (!result) throw "Something went wrong!";
      else {
        await deleteUserAddress([userId]);
        let userAddressResult = await insertUserAddress([userId, result]);
        if (!userAddressResult) throw "Something went wrong!";
        return res
          .status(200)
          .json({ success: true, message: "Your profile updated successfully" });
      }
    }

    let updateAddress = await updateAddressById([
      city,
      area,
      pincode,
      address.address_id,
    ]);
    if (updateAddress != 1) throw "Something went wrong!";

    return res
      .status(200)
      .json({ success: true, message: "Your Profile updated successfully" });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};

// get details of user
export const getUserDetails = async (req, res) => {
  try {
    const user = req.user;

    const address = await getUserAddress(user.id);
    const vehicleServices = await getVehicleAssociatedServices(user.id);
    res
      .status(201)
      .json({ user, address: address[0], vehicleServices: vehicleServices });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong" });
  }
};

// count number of days from which user is registered
export const daysCount = async (req, res) => {
  try {
    const user = req.user;
    const joined = user.created_at;
    const time = new Date().getTime() - new Date(joined).getTime();
    const days = Math.floor(time / (24 * 60 * 60 * 1000));
    res.status(201).json({ success: true, days });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ success: false, message: "Something went wrong!" });
  }
};
