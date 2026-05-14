import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getDetalles, getDetalleById, createDetalle, updateDetalle, deleteDetalle } from '../controllers/detalle_pedido.controller.js';

const router = Router();

router.get('/', verifyToken, getDetalles);
router.get('/:id', verifyToken, getDetalleById);
router.post('/', verifyToken, createDetalle);
router.put('/:id', verifyToken, updateDetalle);
router.delete('/:id', verifyToken, deleteDetalle);

export default router;
