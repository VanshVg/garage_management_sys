import { Request, Response } from "express";
import path from "path";
import multer from "multer";
import { userInterface } from "../interfaces/interface";

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req: Request, file, cb) {
    req.body.thumbnail =
      (req.user as userInterface).email +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null,
      (req.user as userInterface).email +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

export default upload;
