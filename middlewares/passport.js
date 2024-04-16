import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "dotenv";
import { findOne } from "../utils/dbHandler.js";
import passport from "passport";

config();
var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

export const applyPassportStrategy = () => {
  const options = {};
  options.secretOrKey = process.env.SECRET_KEY || "GarageManagementDB";
  options.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor]);
  passport.use(
    new Strategy(options, async (payload, done) => {
      let result = await findOne([payload.email]);
      result = result[0];
      if (result) {
        return done(null, {
          role_id: result.role_id,
          email: payload.email,
        });
      }
      return done(null, false);
    })
  );
};
