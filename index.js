import { config } from "dotenv";
// import { boxicons } from 'boxicons'
import express from "express";
import routes from "./routes/routes.js";

config();
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(routes);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
