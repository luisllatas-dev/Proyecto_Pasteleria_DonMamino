import pool from '../config/db.js';

export const getSedes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Sedes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSedeById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Sedes WHERE id_sede = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Sede no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSede = async (req, res) => {
  try {
    const { nombre_sede, direccion, telefono, email } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Sedes (nombre_sede, direccion, telefono, email) VALUES (?, ?, ?, ?)',
      [nombre_sede, direccion, telefono, email]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Sede creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSede = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_sede, direccion, telefono, email } = req.body;
    const [result] = await pool.query(
      'UPDATE Sedes SET nombre_sede = ?, direccion = ?, telefono = ?, email = ? WHERE id_sede = ?',
      [nombre_sede, direccion, telefono, email, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Sede no encontrada' });
    res.json({ mensaje: 'Sede actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSede = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM Sedes WHERE id_sede = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Sede no encontrada' });
    res.json({ mensaje: 'Sede eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
