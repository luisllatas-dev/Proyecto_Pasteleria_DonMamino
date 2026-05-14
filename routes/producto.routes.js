import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } from '../controllers/producto.controller.js';

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProductoById);
router.post('/', verifyToken, createProducto);
router.put('/:id', verifyToken, updateProducto);
router.delete('/:id', verifyToken, deleteProducto);

export default router;
