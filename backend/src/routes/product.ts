import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";

const router = Router();

router.use(protect);
router.get("/", authorize("product", "read"), getProducts);
router.post("/", authorize("product", "create"), createProduct);
router.put("/:id", authorize("product", "update"), updateProduct);
router.delete("/:id", authorize("product", "delete"), deleteProduct);

export default router;
