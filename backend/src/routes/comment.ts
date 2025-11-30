import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment";

const router = Router();

router.use(protect);
router.get("/", authorize("comment", "read"), getComments);
router.post("/", authorize("comment", "create"), createComment);
router.put("/:id", authorize("comment", "update"), updateComment);
router.delete("/:id", authorize("comment", "delete"), deleteComment);

export default router;
