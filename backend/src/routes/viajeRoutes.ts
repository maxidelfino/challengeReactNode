import { Router } from 'express';
import { getViajes, createViaje, updateViaje, deleteViaje } from '../controllers/viajeController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/',authMiddleware,  getViajes);
router.post('/',authMiddleware,  createViaje);
router.put('/:id',authMiddleware,  updateViaje);
router.delete('/:id',authMiddleware,  deleteViaje);

export default router;