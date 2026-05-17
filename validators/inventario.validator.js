import { check } from 'express-validator';
import { validateResult } from '../middlewares/validator.middleware.js';

export const validateCreateInventario = [
  check('id_producto', 'El ID de producto debe ser un número entero').isInt(),
  check('id_sede', 'El ID de sede debe ser un número entero').isInt(),
  check('cantidad_actual', 'La cantidad actual debe ser un número entero mayor o igual a 0').isInt({ min: 0 }),
  check('cantidad_minima', 'La cantidad mínima debe ser un número entero mayor o igual a 0').isInt({ min: 0 }),
  (req, res, next) => validateResult(req, res, next)
];

export const validateUpdateInventario = [
  check('id_producto', 'El ID de producto debe ser un número entero').optional().isInt(),
  check('id_sede', 'El ID de sede debe ser un número entero').optional().isInt(),
  check('cantidad_actual', 'La cantidad actual debe ser un número entero mayor o igual a 0').optional().isInt({ min: 0 }),
  check('cantidad_minima', 'La cantidad mínima debe ser un número entero mayor o igual a 0').optional().isInt({ min: 0 }),
  (req, res, next) => validateResult(req, res, next)
];
