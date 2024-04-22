import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "dotenv";
import { findOne } from "../utils/common.js";
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
  let jwt = null;
  try {
    jwt = ExtractJwt.fromExtractors([cookieExtractor]);
  }
  catch (error) {
    return null;
  }
  options.jwtFromRequest = jwt;
  passport.use(
    new Strategy(options, async (payload, done) => {
      let result = await findOne([payload.email]);
      result = result[0];
      if (result) {
        return done(null, {
          id: result.id,
          role_id: result.role_id,
          email: payload.email,
        });
      }
      return done(null, false);
    })
  );
};
