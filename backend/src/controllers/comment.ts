import type { Request, Response } from "express";
import Comment from "../models/Comment";

export const getComments = async (_: Request, res: Response) => {
  const comments = await Comment.findAll({ include: ["User"] });
  res.json(comments);
};

export const createComment = async (req: Request, res: Response) => {
  const comment = await Comment.create({
    ...req.body,
    userId: (req as any).user.get("id"),
  });
  res.status(201).json(comment);
};

export const updateComment = async (req: Request, res: Response) => {
  await Comment.update(req.body, { where: { id: req.params.id } });
  const comment = await Comment.findByPk(req.params.id);
  res.json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  await Comment.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};
