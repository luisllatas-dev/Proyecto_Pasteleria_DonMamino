import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getSedes, getSedeById, createSede, updateSede, deleteSede } from '../controllers/sede.controller.js';

const router = Router();

router.get('/', getSedes);
router.get('/:id', getSedeById);
router.post('/', verifyToken, createSede);
router.put('/:id', verifyToken, updateSede);
router.delete('/:id', verifyToken, deleteSede);

export default router;
