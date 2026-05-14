import { Router } from 'express';
import { getReportes, getReporteById, createReporte, updateReporte, deleteReporte } from '../controllers/reporte_ventas.controller.js';

const router = Router();

router.get('/', getReportes);
router.get('/:id', getReporteById);
router.post('/', createReporte);
router.put('/:id', updateReporte);
router.delete('/:id', deleteReporte);

export default router;
