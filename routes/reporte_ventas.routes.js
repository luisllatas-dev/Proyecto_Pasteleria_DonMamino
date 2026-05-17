import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateCreateReporte, validateUpdateReporte } from '../validators/reporte_ventas.validator.js';
import { getReportes, getReporteById, createReporte, updateReporte, deleteReporte } from '../controllers/reporte_ventas.controller.js';

const router = Router();

router.get('/', verifyToken, getReportes);
router.get('/:id', verifyToken, getReporteById);
router.post('/', verifyToken, validateCreateReporte, createReporte);
router.put('/:id', verifyToken, validateUpdateReporte, updateReporte);
router.delete('/:id', verifyToken, deleteReporte);

export default router;
