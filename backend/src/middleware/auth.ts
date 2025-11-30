import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Permission from "../models/Permission";

interface JwtPayload {
  id: number;
  isAdmin: boolean;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (resource: string, action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    // TODO: Dropped for now, maybe implement later.
    // if (user.get("isAdmin")) return next();
    // const permission = await Permission.findOne({
    //   where: { userId: user.get("id"), resource, action, allowed: true },
    // });

    // if (!permission) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }
    next();
  };
};
