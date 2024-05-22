import { Request } from "express";
import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  StrategyOptionsWithSecret,
} from "passport-jwt";
import { config } from "dotenv";
import { findOne } from "../utils/common";
import passport from "passport";
import { userInterface } from "../interfaces/interface";

config();
var cookieExtractor = function (req: Request) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

export const applyPassportStrategy = () => {
  let jwt: unknown = null;
  try {
    jwt = ExtractJwt.fromExtractors([cookieExtractor]);
  } catch (error) {
    return null;
  }

  const options: StrategyOptions = {
    jwtFromRequest: jwt,
    secretOrKey: process.env.SECRET_KEY,
  } as StrategyOptionsWithSecret;

  passport.use(
    new Strategy(options, async (payload, done) => {
      let result: Array<userInterface> = (await findOne([
        payload.email,
      ])) as Array<userInterface>;
      if (result[0]) {
        return done(null, result[0]);
      }
      return done(null, false);
    })
  );
};
