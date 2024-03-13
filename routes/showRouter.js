import { Router } from "express";
const router = Router();

import {
  getAllShows,
  getShow,
  createShow,
  editShow,
  deleteShow,
  showStats,
} from "../controller/showController.js";
import {
  validateShowInputs,
  validateShowID,
} from "../middleware/validationHandler.js";
/*
router.get('/',getAllShows)
router.get('/',createShow) */

router.route("/").get(getAllShows).post(validateShowInputs, createShow);

router.route("stats").get(showStats);

router
  .route("/:id")
  .get(validateShowID, getShow)
  .patch(validateShowInputs, validateShowID, editShow)
  .delete(validateShowID, deleteShow);

export default router;
