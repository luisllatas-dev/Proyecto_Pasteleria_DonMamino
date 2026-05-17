import { check } from 'express-validator';
import { validateResult } from '../middlewares/validator.middleware.js';

export const validateCreateReporte = [
  check('total_ventas', 'El total de ventas debe ser un número positivo').isFloat({ min: 0 }),
  check('id_sede', 'El ID de sede debe ser un número entero').isInt(),
  (req, res, next) => validateResult(req, res, next)
];

export const validateUpdateReporte = [
  check('total_ventas', 'El total de ventas debe ser un número positivo').optional().isFloat({ min: 0 }),
  check('id_sede', 'El ID de sede debe ser un número entero').optional().isInt(),
  (req, res, next) => validateResult(req, res, next)
];
