import { Router } from 'express';
import { getDetalles, getDetalleById, createDetalle, updateDetalle, deleteDetalle } from '../controllers/detalle_pedido.controller.js';

const router = Router();

router.get('/', getDetalles);
router.get('/:id', getDetalleById);
router.post('/', createDetalle);
router.put('/:id', updateDetalle);
router.delete('/:id', deleteDetalle);

export default router;
