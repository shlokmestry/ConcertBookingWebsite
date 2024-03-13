import { Router } from "express";
import {
  currentUser,
  editUser,
  showsStats,
} from "../controller/userController.js";
import { validateEditedUser } from "../middleware/validationHandler.js";
import { authorizePermission } from "../middleware/authHandler.js";
import upload from "../middleware/multerHandler.js";
const router = Router();

router.get("/currentuser", currentUser);
router.get("/admin/showstats", [authorizePermission("admin"), showsStats]);
router.patch(
  "/edituser",
  upload.single("avatar"),
  validateEditedUser,
  editUser
);

export default router;
