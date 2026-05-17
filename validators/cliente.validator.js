import { check } from 'express-validator';
import { validateResult } from '../middlewares/validator.middleware.js';

export const validateCreateCliente = [
  check('nombre_cliente', 'El nombre del cliente es obligatorio').notEmpty(),
  check('email', 'Debe ser un correo electrónico válido').isEmail(),
  check('telefono', 'El teléfono es obligatorio').notEmpty(),
  check('direccion_envio', 'La dirección de envío es obligatoria').notEmpty(),
  (req, res, next) => validateResult(req, res, next)
];

export const validateUpdateCliente = [
  check('nombre_cliente', 'El nombre del cliente no puede estar vacío').optional().notEmpty(),
  check('email', 'Debe ser un correo electrónico válido').optional().isEmail(),
  check('telefono', 'El teléfono no puede estar vacío').optional().notEmpty(),
  check('direccion_envio', 'La dirección de envío no puede estar vacía').optional().notEmpty(),
  (req, res, next) => validateResult(req, res, next)
];
