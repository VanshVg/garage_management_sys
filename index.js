import { config } from "dotenv";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";
import socket from "./utils/socket.js";
config();
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(routes);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running at:http://localhost:${port}`);
});

const io = socket(server);