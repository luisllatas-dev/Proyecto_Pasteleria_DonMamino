import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getPedidos, getPedidoById, createPedido, updatePedido, deletePedido } from '../controllers/pedido.controller.js';

const router = Router();

router.get('/', verifyToken, getPedidos);
router.get('/:id', verifyToken, getPedidoById);
router.post('/', verifyToken, createPedido);
router.put('/:id', verifyToken, updatePedido);
router.delete('/:id', verifyToken, deletePedido);

export default router;
