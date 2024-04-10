import { config } from "dotenv";
// import { boxicons } from 'boxicons'
import express from 'express';
import routes from './routes/routes.js'
import passport from "passport";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { applyPassportStrategy } from './auth/auth.js';

config();
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(routes);



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
