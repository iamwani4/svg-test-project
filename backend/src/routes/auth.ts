import { Router } from "express";
import { login, register } from "../controllers/auth";
import { body } from "express-validator";

const router = Router();

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  login
);
router.post(
  "/register",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  register
);

export default router;
