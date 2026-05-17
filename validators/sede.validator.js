import { check } from 'express-validator';
import { validateResult } from '../middlewares/validator.middleware.js';

export const validateCreateSede = [
  check('nombre_sede', 'El nombre de la sede es obligatorio').notEmpty(),
  check('direccion', 'La dirección es obligatoria').notEmpty(),
  check('telefono', 'El teléfono es obligatorio').notEmpty(),
  check('email', 'Debe ser un correo electrónico válido').isEmail(),
  (req, res, next) => validateResult(req, res, next)
];

export const validateUpdateSede = [
  check('nombre_sede', 'El nombre de la sede no puede estar vacío').optional().notEmpty(),
  check('direccion', 'La dirección no puede estar vacía').optional().notEmpty(),
  check('telefono', 'El teléfono no puede estar vacío').optional().notEmpty(),
  check('email', 'Debe ser un correo electrónico válido').optional().isEmail(),
  (req, res, next) => validateResult(req, res, next)
];
