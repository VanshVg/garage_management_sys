import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";
import { findOne } from "../utils/common";
import { Request, Response, NextFunction } from "express";
import { userInterface } from "../interfaces/interface";

config();

interface decodedTokenInterface {
  email: string;
}

export const isAlreadyLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return next();
    }
    let secretKey: Secret = process.env.SECRET_KEY as Secret;
    const decodedToken = jwt.verify(token, secretKey);
    const { email } = decodedToken as decodedTokenInterface;

    if (!email) {
      return next();
    }

    const user: Array<userInterface> = (await findOne([
      email,
    ])) as Array<userInterface>;

    if (!user || user.length === 0) {
      return next();
    }

    const { role_id } = user[0];
    const redirectUrl = role_id === 0 ? "/customer/home" : "/owner/home";
    res.redirect(redirectUrl);
  } catch (error) {
    next();
  }
};
