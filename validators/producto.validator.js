import { check } from 'express-validator';
import { validateResult } from '../middlewares/validator.middleware.js';

export const validateCreateProducto = [
  check('nombre_producto', 'El nombre del producto es obligatorio').notEmpty(),
  check('descripcion', 'La descripción es obligatoria').notEmpty(),
  check('precio', 'El precio debe ser un número positivo').isFloat({ min: 0 }),
  check('stock', 'El stock debe ser un número entero mayor o igual a 0').isInt({ min: 0 }),
  check('estado', 'El estado debe ser activo o inactivo').optional().isIn(['activo', 'inactivo']),
  check('tipo_producto', 'El tipo de producto no es válido').optional().isIn(['vendible', 'insumo']),
  (req, res, next) => validateResult(req, res, next)
];

export const validateUpdateProducto = [
  check('nombre_producto', 'El nombre del producto no puede estar vacío').optional().notEmpty(),
  check('descripcion', 'La descripción no puede estar vacía').optional().notEmpty(),
  check('precio', 'El precio debe ser un número positivo').optional().isFloat({ min: 0 }),
  check('stock', 'El stock debe ser un número entero mayor o igual a 0').optional().isInt({ min: 0 }),
  check('estado', 'El estado debe ser activo o inactivo').optional().isIn(['activo', 'inactivo']),
  check('tipo_producto', 'El tipo de producto no es válido').optional().isIn(['vendible', 'insumo']),
  (req, res, next) => validateResult(req, res, next)
];
