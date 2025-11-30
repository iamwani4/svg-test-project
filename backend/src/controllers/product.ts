import type { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async (_: Request, res: Response) => {
  const products = await Product.findAll();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  await Product.update(req.body, { where: { id: req.params.id } });
  const product = await Product.findByPk(req.params.id);
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};
