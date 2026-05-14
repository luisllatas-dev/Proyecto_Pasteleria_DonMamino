import pool from '../config/db.js';

export const getInventario = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Inventario');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getInventarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Inventario WHERE id_inventario = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createInventario = async (req, res) => {
  try {
    const { id_producto, id_sede, cantidad_actual, cantidad_minima } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Inventario (id_producto, id_sede, cantidad_actual, cantidad_minima) VALUES (?, ?, ?, ?)',
      [id_producto, id_sede, cantidad_actual, cantidad_minima]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Registro de inventario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateInventario = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_producto, id_sede, cantidad_actual, cantidad_minima } = req.body;
    const [result] = await pool.query(
      'UPDATE Inventario SET id_producto = ?, id_sede = ?, cantidad_actual = ?, cantidad_minima = ? WHERE id_inventario = ?',
      [id_producto, id_sede, cantidad_actual, cantidad_minima, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    res.json({ mensaje: 'Registro de inventario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteInventario = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM Inventario WHERE id_inventario = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    res.json({ mensaje: 'Registro de inventario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
