import { Router } from "express";
import {
  getViajes,
  getViajeById,
  createViaje,
  updateViaje,
  deleteViaje,
  getViajesStats,
  getAllViajes,
} from "../controllers/viajeController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getViajes);
router.get("/stats", authMiddleware, getViajesStats);
router.get("/all", authMiddleware, getAllViajes);
router.get("/:id", authMiddleware, getViajeById);
router.post("/", authMiddleware, createViaje);
router.put("/:id", authMiddleware, updateViaje);
router.delete("/:id", authMiddleware, deleteViaje);

export default router;
