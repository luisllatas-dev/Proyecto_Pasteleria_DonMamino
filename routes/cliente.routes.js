import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getClientes, getClienteById, createCliente, updateCliente, deleteCliente } from '../controllers/cliente.controller.js';

const router = Router();

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', verifyToken, createCliente);
router.put('/:id', verifyToken, updateCliente);
router.delete('/:id', verifyToken, deleteCliente);

export default router;
