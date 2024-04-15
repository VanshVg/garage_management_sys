import { config } from "dotenv";
import express from 'express';
import passport from "passport";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import routes from './routes/routes.js'

config();
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at:http://localhost:${port}`);
});
