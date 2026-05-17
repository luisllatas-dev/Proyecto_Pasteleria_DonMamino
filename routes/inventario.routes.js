import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateCreateInventario, validateUpdateInventario } from '../validators/inventario.validator.js';
import { getInventario, getInventarioById, createInventario, updateInventario, deleteInventario } from '../controllers/inventario.controller.js';

const router = Router();

router.get('/', verifyToken, getInventario);
router.get('/:id', verifyToken, getInventarioById);
router.post('/', verifyToken, validateCreateInventario, createInventario);
router.put('/:id', verifyToken, validateUpdateInventario, updateInventario);
router.delete('/:id', verifyToken, deleteInventario);

export default router;
