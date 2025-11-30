import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  searchClients,
} from "../controllers/client";

const router = Router();

router.use(protect);
router.get("/", authorize("client", "read"), getClients);
router.get("/search", authorize("client", "read"), searchClients);
router.post("/", authorize("client", "create"), createClient);
router.put("/:id", authorize("client", "update"), updateClient);
router.delete("/:id", authorize("client", "delete"), deleteClient);

export default router;
