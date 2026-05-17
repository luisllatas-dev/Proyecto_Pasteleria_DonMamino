import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateCreateDetalle, validateUpdateDetalle } from '../validators/detalle_pedido.validator.js';
import { getDetalles, getDetalleById, createDetalle, updateDetalle, deleteDetalle } from '../controllers/detalle_pedido.controller.js';

const router = Router();

router.get('/', verifyToken, getDetalles);
router.get('/:id', verifyToken, getDetalleById);
router.post('/', verifyToken, validateCreateDetalle, createDetalle);
router.put('/:id', verifyToken, validateUpdateDetalle, updateDetalle);
router.delete('/:id', verifyToken, deleteDetalle);

export default router;
