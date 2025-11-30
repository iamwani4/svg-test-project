import type { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { comparePasswordAndHash, hashPassword } from "../lib/hash-utils";

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });
  const token = generateToken(user.id);

  res.status(201).json({
    user: {
      id: user.get("id"),
      name: user.get("name"),
      email: user.get("email"),
      isAdmin: user.get("isAdmin"),
    },
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (
    !user ||
    !(await comparePasswordAndHash(password, user.get("password")))
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user.get("id"));
  res.json({
    user: {
      id: user.get("id"),
      name: user.get("name"),
      email: user.get("email"),
      isAdmin: user.get("isAdmin"),
    },
    token,
  });
};
