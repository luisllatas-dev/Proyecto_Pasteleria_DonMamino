import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateCreateProducto, validateUpdateProducto } from '../validators/producto.validator.js';
import { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } from '../controllers/producto.controller.js';

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProductoById);
router.post('/', verifyToken, validateCreateProducto, createProducto);
router.put('/:id', verifyToken, validateUpdateProducto, updateProducto);
router.delete('/:id', verifyToken, deleteProducto);

export default router;
