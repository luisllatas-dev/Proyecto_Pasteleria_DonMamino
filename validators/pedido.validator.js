import { check } from 'express-validator';
import { validateResult } from '../middlewares/validator.middleware.js';

export const validateCreatePedido = [
  check('estado', 'El estado no es válido').optional().isIn(['procesando', 'en preparación', 'enviado', 'entregado']),
  check('id_cliente', 'El ID de cliente debe ser un número entero').isInt(),
  check('id_usuario', 'El ID de usuario debe ser un número entero').isInt(),
  check('id_sede', 'El ID de sede debe ser un número entero').isInt(),
  (req, res, next) => validateResult(req, res, next)
];

export const validateUpdatePedido = [
  check('estado', 'El estado no es válido').optional().isIn(['procesando', 'en preparación', 'enviado', 'entregado']),
  check('id_cliente', 'El ID de cliente debe ser un número entero').optional().isInt(),
  check('id_usuario', 'El ID de usuario debe ser un número entero').optional().isInt(),
  check('id_sede', 'El ID de sede debe ser un número entero').optional().isInt(),
  (req, res, next) => validateResult(req, res, next)
];
