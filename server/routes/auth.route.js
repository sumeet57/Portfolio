import { Router } from "express";
import {
  getUser,
  login,
  register,
  requestCode,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authentication.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/request-code", requestCode);
authRouter.get("/me", authenticate, getUser);

export default authRouter;
