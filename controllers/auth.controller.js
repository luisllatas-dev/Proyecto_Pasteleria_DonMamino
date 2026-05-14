import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const usuario = rows[0];

    // Verificar si la contraseña en base de datos parece un hash de bcrypt (empieza con $2a$ o $2b$)
    let isMatch = false;
    if (usuario.contraseña.startsWith('$2a$') || usuario.contraseña.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    } else {
      // Fallback para contraseñas en texto plano creadas antes de integrar bcrypt
      isMatch = (contraseña === usuario.contraseña);
    }
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const payload = {
      id_usuario: usuario.id_usuario,
      rol: usuario.rol,
      id_sede: usuario.id_sede
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre_usuario,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
