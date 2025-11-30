import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order";

const router = Router();

router.use(protect);
router.get("/", authorize("order", "read"), getOrders);
router.post("/", authorize("order", "create"), createOrder);
router.put("/:id", authorize("order", "update"), updateOrder);
router.delete("/:id", authorize("order", "delete"), deleteOrder);

export default router;
