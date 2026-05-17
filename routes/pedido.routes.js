import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateCreatePedido, validateUpdatePedido } from '../validators/pedido.validator.js';
import { getPedidos, getPedidoById, createPedido, updatePedido, deletePedido } from '../controllers/pedido.controller.js';

const router = Router();

router.get('/', verifyToken, getPedidos);
router.get('/:id', verifyToken, getPedidoById);
router.post('/', verifyToken, validateCreatePedido, createPedido);
router.put('/:id', verifyToken, validateUpdatePedido, updatePedido);
router.delete('/:id', verifyToken, deletePedido);

export default router;
