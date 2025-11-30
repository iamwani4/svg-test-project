import type { Request, Response } from "express";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import { sequelize } from "../config/database";

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

export const getOrders = async (_: Request, res: Response) => {
  const orders = await Order.findAll({
    include: [
      "Client",
      "User",
      { model: OrderItem, as: "items", include: ["Product"] },
    ],
  });
  res.json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  try {
    const { clientId, items, cashAmount = 0, cardAmount = 0 } = req.body;
    const userId = (req as any).user.get("id");
    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    if (total !== Number(cashAmount) + Number(cardAmount)) {
      return res
        .status(400)
        .json({ message: "Payment split must match total" });
    }

    const order = await Order.create(
      {
        clientId,
        userId,
        totalAmount: total,
        cashAmount,
        cardAmount,
        status: "completed",
      },
      { transaction }
    );

    for (const item of items) {
      await OrderItem.create(
        {
          orderId: order.get("id"),
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        },
        { transaction }
      );
    }

    await transaction.commit();
    const fullOrder = await Order.findByPk(order.id, {
      include: [
        "Client",
        "User",
        { model: OrderItem, as: "items", include: ["Product"] },
      ],
    });
    res.status(201).json(fullOrder);
  } catch (err) {
    console.error("Failed to create order:", err);
    await transaction.rollback();
    res.status(500).json({ message: "Order creation failed" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  await Order.update(req.body, { where: { id: req.params.id } });
  const order = await Order.findByPk(req.params.id);
  res.json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
  await Order.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};
