import type { Request, Response } from "express";
import Permission from "../models/Permission";

export const getUserPermissions = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const permissions = await Permission.findAll({ where: { userId } });
  res.json(permissions);
};

export const updateUserPermissions = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const permissions = req.body;

  await Permission.destroy({ where: { userId } });
  await Permission.bulkCreate(
    permissions.map((p: any) => ({
      userId: Number(userId),
      resource: p.resource,
      action: p.action,
      allowed: p.allowed,
    }))
  );

  res.json({ message: "Permissions updated" });
};
