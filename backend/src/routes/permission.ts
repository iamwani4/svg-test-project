import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import {
  getUserPermissions,
  updateUserPermissions,
} from "../controllers/permission";

const router = Router();

router.use(protect);
router.get("/:userId", authorize("permission", "read"), getUserPermissions);
router.put(
  "/:userId",
  authorize("permission", "update"),
  updateUserPermissions
);

export default router;
