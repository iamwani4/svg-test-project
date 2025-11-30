import type { Request, Response } from "express";
import Client from "../models/Client";

export const getClients = async (_: Request, res: Response) => {
  const clients = await Client.findAll();
  res.json(clients);
};

export const createClient = async (req: Request, res: Response) => {
  const client = await Client.create(req.body);
  res.status(201).json(client);
};

export const updateClient = async (req: Request, res: Response) => {
  await Client.update(req.body, { where: { id: req.params.id } });
  const client = await Client.findByPk(req.params.id);
  res.json(client);
};

export const deleteClient = async (req: Request, res: Response) => {
  await Client.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};

export const searchClients = async (req: Request, res: Response) => {
  const { q } = req.query;
  const clients = await Client.findAll({
    where: {
      name: { [require("sequelize").Op.iLike]: `%${q}%` },
    },
    limit: 10,
  });
  res.json(clients);
};
