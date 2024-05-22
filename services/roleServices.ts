import { Request, Response, NextFunction } from "express";
import { userInterface } from "../interfaces/interface";

export const validateRole =
  (role_id: number) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.redirect("/u/signIn");
    }
    if ((req.user as userInterface).role_id == role_id) {
      next();
    } else {
      res.redirect("/u/signIn");
    }
  };
