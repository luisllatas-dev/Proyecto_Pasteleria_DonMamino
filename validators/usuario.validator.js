import { check } from 'express-validator';
import { validateResult } from '../middlewares/validator.middleware.js';

export const validateCreateUsuario = [
  check('nombre_usuario', 'El nombre de usuario es obligatorio').notEmpty(),
  check('email', 'Debe ser un correo electrónico válido').isEmail(),
  check('contraseña', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  check('rol', 'El rol es obligatorio').notEmpty(),
  (req, res, next) => validateResult(req, res, next)
];

export const validateUpdateUsuario = [
  check('nombre_usuario', 'El nombre de usuario no puede estar vacío').optional().notEmpty(),
  check('email', 'Debe ser un correo electrónico válido').optional().isEmail(),
  check('contraseña', 'La contraseña debe tener al menos 6 caracteres').optional().isLength({ min: 6 }),
  check('rol', 'El rol no puede estar vacío').optional().notEmpty(),
  (req, res, next) => validateResult(req, res, next)
];
