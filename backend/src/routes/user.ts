import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import { getUsers, updateUser, deleteUser } from "../controllers/user";

const router = Router();

router.use(protect);
router.get("/", authorize("user", "read"), getUsers);
router.put("/:id", authorize("user", "update"), updateUser);
router.delete("/:id", authorize("user", "delete"), deleteUser);

export default router;
