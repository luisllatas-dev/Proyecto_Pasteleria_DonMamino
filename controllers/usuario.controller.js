import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nombre_usuario, email, rol, contraseña, id_sede } = req.body;
    
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const [result] = await pool.query(
      'INSERT INTO Usuarios (nombre_usuario, email, rol, contraseña, id_sede) VALUES (?, ?, ?, ?, ?)',
      [nombre_usuario, email, rol, hashedPassword, id_sede]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_usuario, email, rol, contraseña, id_sede } = req.body;
    
    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const [result] = await pool.query(
      'UPDATE Usuarios SET nombre_usuario = ?, email = ?, rol = ?, contraseña = ?, id_sede = ? WHERE id_usuario = ?',
      [nombre_usuario, email, rol, hashedPassword, id_sede, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
