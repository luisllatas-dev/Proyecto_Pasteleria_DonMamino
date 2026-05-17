import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateCreateUsuario, validateUpdateUsuario } from '../validators/usuario.validator.js';
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js';

const router = Router();

router.get('/', verifyToken, getUsuarios);
router.get('/:id', verifyToken, getUsuarioById);
router.post('/', verifyToken, validateCreateUsuario, createUsuario);
router.put('/:id', verifyToken, validateUpdateUsuario, updateUsuario);
router.delete('/:id', verifyToken, deleteUsuario);

export default router;
