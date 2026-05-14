import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getInventario, getInventarioById, createInventario, updateInventario, deleteInventario } from '../controllers/inventario.controller.js';

const router = Router();

router.get('/', verifyToken, getInventario);
router.get('/:id', verifyToken, getInventarioById);
router.post('/', verifyToken, createInventario);
router.put('/:id', verifyToken, updateInventario);
router.delete('/:id', verifyToken, deleteInventario);

export default router;
