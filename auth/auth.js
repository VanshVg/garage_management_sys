import { Strategy } from 'passport-jwt';

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
  };

  export const applyPassportStrategy = passport => {
    const options = {};
    options.jwtFromRequest = cookieExtractor;
    
    options.secretOrKey = 'secret'
    passport.use(
      new Strategy(options, async (payload, done) => {
       var result = "ganpat@gmail.com"
        // const result = await select("select * from users where email =?", [
        //   payload.payload,
        // ]);
        if (result.length>0) {
          return done(null, {
            // username: result[0].email,   
            username: result,       
          });
        }
        return done(null, false);
        
      })
    );
  };