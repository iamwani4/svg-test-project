import type { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.update(req.body, { where: { id } });
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "User deleted" });
};
