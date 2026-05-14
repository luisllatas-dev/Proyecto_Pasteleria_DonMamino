import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js';

const router = Router();

router.get('/', verifyToken, getUsuarios);
router.get('/:id', verifyToken, getUsuarioById);
router.post('/', verifyToken, createUsuario);
router.put('/:id', verifyToken, updateUsuario);
router.delete('/:id', verifyToken, deleteUsuario);

export default router;
