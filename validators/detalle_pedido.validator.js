import { check } from 'express-validator';
import { validateResult } from '../middlewares/validator.middleware.js';

export const validateCreateDetalle = [
  check('id_pedido', 'El ID de pedido debe ser un número entero').isInt(),
  check('id_producto', 'El ID de producto debe ser un número entero').isInt(),
  check('cantidad', 'La cantidad debe ser un entero mayor a 0').isInt({ min: 1 }),
  check('precio_unitario', 'El precio unitario debe ser un número positivo').isFloat({ min: 0 }),
  (req, res, next) => validateResult(req, res, next)
];

export const validateUpdateDetalle = [
  check('id_pedido', 'El ID de pedido debe ser un número entero').optional().isInt(),
  check('id_producto', 'El ID de producto debe ser un número entero').optional().isInt(),
  check('cantidad', 'La cantidad debe ser un entero mayor a 0').optional().isInt({ min: 1 }),
  check('precio_unitario', 'El precio unitario debe ser un número positivo').optional().isFloat({ min: 0 }),
  (req, res, next) => validateResult(req, res, next)
];
